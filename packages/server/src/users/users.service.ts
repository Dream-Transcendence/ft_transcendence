import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { GetUserRoomDto, GetUserRoomsDto } from 'src/chats/dto/rooms.dto';
import { ChannelParticipant, DmParticipant } from 'src/chats/rooms.entity';
import { Like, Not, Repository } from 'typeorm';
import { AuthUserDto } from './dto/auth-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { PatchNicknameDto } from './dto/patch-user.dto';
import {
  FriendDto,
  ClientInviteGameDto,
  CancelInviteDto,
  UserDto,
  ServerInviteGameDto,
  ClientAcceptGameDto,
  ServerAcceptGameDto,
  Connection,
  UserIdDto,
  ServerRequestDto,
  RequestIdDto,
  ClientRequestDto,
  PatchAuthDto,
  IsBlockedDto,
  CheckFriendDto,
  WsExceptionDto,
} from './dto/user.dto';
import { v4 as uuidv4 } from 'uuid';
import { Auth, Block, Friend, Request, User, Rank, Game } from './users.entity';
import { ConnectionDto, ConnectionsDto } from './dto/connect-user.dto';
import { WsException } from '@nestjs/websockets';
import { MailerService } from '@nestjs-modules/mailer';
import * as AWS from 'aws-sdk';
import { GameLadderDto, GameRecordDto, WatchDto } from 'src/game/game.dto';

@Injectable()
export class UserService {
  private logger = new Logger('UsersService');
  s3 = new AWS.S3();
  private connectionList = new Map<string, Connection>();

  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<User>,
    @Inject('BLOCKS_REPOSITORY')
    private blocksRepository: Repository<Block>,
    @Inject('AUTH_REPOSITORY')
    private authRepository: Repository<Auth>,
    @Inject('FRIENDS_REPOSITORY')
    private friendsRepository: Repository<Friend>,
    @Inject('REQUESTS_REPOSITORY')
    private requestsRepository: Repository<Request>,
    @Inject('CHANNELPARTICIPANTS_REPOSITORY')
    private channelParticipantsRepository: Repository<ChannelParticipant>,
    @Inject('DMPARTICIPANTS_REPOSITORY')
    private dmParticipantsRepository: Repository<DmParticipant>,
    @Inject('GAMES_REPOSITORY')
    private gamesRepository: Repository<Game>,
    @Inject('RANK_REPOSITORY')
    private rankRepository: Repository<Rank>,
    private readonly mailerService: MailerService,
  ) {}

  //ANCHOR: user management
  async addUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const { id, nickname, image, email } = createUserDto;

    let user = this.usersRepository.create({
      id,
      nickname,
      image,
    });
    user = await this.usersRepository.save(user);

    let authId = 1;
    const maxAuthId = await this.authRepository
      .createQueryBuilder('auth')
      .select('MAX(auth.id)', 'id')
      .getRawOne();
    if (maxAuthId.id !== null) authId = maxAuthId.id + 1;

    const auth = this.authRepository.create({
      id: authId,
      email,
      authenticated: false,
      user,
    });
    await this.authRepository.save(auth);

    let rankId = 1;
    const maxRankId = await this.rankRepository
      .createQueryBuilder('Rank')
      .select('MAX(Rank.id)', 'id')
      .getRawOne();
    if (maxRankId.id !== null) rankId = maxRankId.id + 1;

    const rank = this.rankRepository.create({
      id: rankId,
      rank: 0,
      win: 0,
      lose: 0,
      user,
    });
    await this.rankRepository.save(rank);

    const userDto = new UserDto(user.id, user.nickname, user.image);
    return userDto;
  }

  async getUser(id: number): Promise<UserDto> {
    const user = await this.usersRepository.findOne({ where: [{ id: id }] });

    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    const userDto = new UserDto(user.id, user.nickname, user.image);
    return userDto;
  }

  async patchImage(id: number, file: Express.Multer.File) {
    const user = await this.usersRepository.findOne({ where: [{ id: id }] });

    // NOTE: ????????? S3??? ????????????, ??? ????????? DB??? ????????????.
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: file.originalname,
      Body: file.buffer,
    };

    try {
      const data = await this.s3.upload(params).promise();
      user.image = data.Location;
      await this.usersRepository.save(user);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }

    const userDto = new UserDto(user.id, user.nickname, user.image);
    return userDto;
  }

  async patchNickname(id: number, userDto: PatchNicknameDto): Promise<UserDto> {
    const { nickname } = userDto;

    const user = await this.usersRepository.findOne({ where: [{ id: id }] });

    // SELECT COUNT(*) FROM public."user" WHERE "nickname" = $1;
    // COUNT??? ????????? ????????? ???????????? ?????? ????????? ?????? ??????.
    const duplicateCheck = await this.usersRepository.findOne({
      where: { nickname: nickname },
    });
    if (duplicateCheck !== null) throw new ConflictException();
    user.nickname = nickname;

    await this.usersRepository.save(user);

    const newUserDto = new UserDto(user.id, user.nickname, user.image);
    return newUserDto;
  }

  private authCodeList: Map<number, number> = new Map();

  async requestAuth(id: number) {
    const userAuth = await this.authRepository.findOne({
      relations: ['user'],
      where: { user: { id: id } },
    });

    // NOTE: ??????????????? ????????????.(000000 ~ 999999)
    const authCode = Math.floor(Math.random() * 900000 + 100000);
    this.authCodeList.set(id, authCode);
    // NOTE: ????????? ????????? 5??? ?????? ????????????.
    setTimeout(() => {
      this.authCodeList.delete(id);
    }, 5 * 60 * 1000);

    await this.mailerService
      .sendMail({
        to: userAuth.email,
        from: 'no-reply <no-reply@transcendence.com>',
        subject: '[ft-transcendence] 2??? ?????? ??????',
        text: `?????? ??????: ${authCode}`,
        html: `<b>?????? ??????: ${authCode}</b>`,
      })
      .then((success) => {
        console.log('Mail sent: ' + success);
      })
      .catch((err) => {
        console.log('Error occured: ' + err);
        throw new BadRequestException();
      });
  }

  async getAuth(id: number): Promise<AuthUserDto> {
    // SELECT * FROM public."auth"
    // LEFT JOIN "user" ON "user"."id" = id
    // WHERE "auth"."userId" = "user"."id";
    const auth = await this.authRepository.findOne({
      relations: { user: true },
      where: { user: { id: id } },
    });
    if (auth === null)
      throw new NotFoundException('????????? ?????? ????????? ????????????.');

    const authUserDto = new AuthUserDto();
    authUserDto.authenticated = auth.authenticated;

    return authUserDto;
  }

  async patchAuth(
    id: number,
    patchAuthDto: PatchAuthDto,
  ): Promise<AuthUserDto> {
    const auth = await this.authRepository.findOne({
      relations: { user: true },
      where: { user: { id: id } },
    });
    const { code } = patchAuthDto;

    console.log(this.authCodeList, code);

    if (code !== undefined || auth.authenticated === false) {
      if (this.authCodeList.get(id) !== code || code === undefined)
        throw new BadRequestException(
          '??????????????? ???????????? ????????? ?????????????????????.',
        );
      this.authCodeList.delete(id);
      if (auth.authenticated === true) return { authenticated: true };
    }

    auth.authenticated = !auth.authenticated;
    await this.authRepository.save(auth);

    return { authenticated: auth.authenticated };
  }

  // ANCHOR: user block
  async blockUser(id: number, userId: number): Promise<UserDto> {
    const user = await this.usersRepository.findOne({ where: [{ id: id }] });
    const blockedUser = await this.usersRepository.findOne({
      where: [{ id: userId }],
    });
    if (blockedUser === null)
      throw new NotFoundException('User who blocked not found');

    // FIXME: ????????????
    let blockId = 1;
    const maxBlockId = await this.blocksRepository
      .createQueryBuilder('block')
      .select('MAX(block.id)', 'id')
      .getRawOne();
    if (maxBlockId != null) blockId = maxBlockId.id + 1;

    let block = this.blocksRepository.create({
      id: blockId,
      blockedTime: new Date(),
      user: user,
      blockedUser: blockedUser,
    });

    block = await this.blocksRepository.save(block);
    return block.blockedUser;
  }

  async unblockUser(id: number, userId: number): Promise<UserDto> {
    const blockRow = await this.blocksRepository.findOne({
      relations: ['user', 'blockedUser'],
      where: [{ user: { id: id }, blockedUser: { id: userId } }],
    });
    if (blockRow === null) throw new NotFoundException('Block not found');

    this.blocksRepository.delete(blockRow.id);
    const user: UserDto = new UserDto(
      blockRow.blockedUser.id,
      blockRow.blockedUser.nickname,
      blockRow.blockedUser.image,
    );
    return user;
  }

  async getBlocks(id: number): Promise<UserDto[]> {
    //SELECT * FROM public."block"
    //LEFT JOIN "user" ON "user"."id" = id
    //WHERE "block"."userId" = "user"."id";
    const blocks = await this.blocksRepository.find({
      relations: { user: true, blockedUser: true },
      where: { user: { id: id } },
    });

    const blockedUsers: UserDto[] = [];
    blocks.forEach((block) => {
      const userDto = new UserDto(
        block.blockedUser.id,
        block.blockedUser.nickname,
        block.blockedUser.image,
      );
      blockedUsers.push(userDto);
    });
    return blockedUsers;
  }

  async getIsBlocked(id: number, userId: number): Promise<IsBlockedDto> {
    const isBlocked = await this.blocksRepository.findOne({
      relations: ['user', 'blockedUser'],
      where: [{ user: { id: id }, blockedUser: { id: userId } }],
    });
    if (isBlocked === null) {
      return { isBlocked: false };
    }
    return { isBlocked: true };
  }

  // ANCHOR: user chat
  async getRooms(id: number): Promise<GetUserRoomsDto> {
    const channels = await this.channelParticipantsRepository.find({
      relations: { room: true },
      where: { user: { id: id } },
    });
    const channelRooms = channels.map((channel) => channel.room);
    const channelList: GetUserRoomDto[] = [];
    channelRooms.forEach((room) => {
      const userRoomDto: GetUserRoomDto = {
        id: room.id,
        name: room.name,
        image: room.image,
        recvMessageCount: 0,
      };
      channelList.push(userRoomDto);
    });

    const dms = await this.dmParticipantsRepository.find({
      relations: { room: true },
      where: { user: { id: id } },
    });
    const dmRooms = dms.map((dm) => dm.room);
    const dmList: GetUserRoomDto[] = [];
    const promises = dmRooms.map(async (room) => {
      const opponent = await this.dmParticipantsRepository.findOne({
        relations: { user: true },
        where: { room: { id: room.id }, user: { id: Not(id) } },
      });
      const row = await this.blocksRepository.findOne({
        where: { user: { id: id }, blockedUser: { id: opponent.user.id } },
      });

      console.log('??? ???????????? ???????');
      const userRoomDto: GetUserRoomDto = {
        id: room.id,
        name: opponent.user.nickname,
        image: opponent.user.image,
        // TODO: recvMessageCount ?????? ??????
        recvMessageCount: 0,
        blocked: row !== null,
      };
      dmList.push(userRoomDto);
    });
    await Promise.all(promises);

    return { channelList, dmList };
  }

  //ANCHOR: user search
  async searchUser(nickname: string): Promise<UserDto[]> {
    // SELECT * FROM public."user"
    // WHERE "user"."nickname" LIKE '%nickname%';
    if (nickname === '') return [];
    const users = await this.usersRepository.find({
      where: { nickname: Like(`%${nickname}%`) },
    });

    const foundUsers: UserDto[] = [];
    users.forEach((user) => {
      const userDto = new UserDto(user.id, user.nickname, user.image);
      foundUsers.push(userDto);
    });

    return foundUsers;
  }

  async searchFriend(id: number, nickname: string): Promise<UserDto[]> {
    // SELECT * FROM public."friend"
    // LEFT JOIN "user" ON "user"."id" = id
    // WHERE "friend"."userId" = "user"."id";
    console.log(id, nickname);

    const friendRows = await this.friendsRepository.find({
      relations: { user: true, friend: true },
      where: { user: { id: id }, friend: { nickname: Like(`%${nickname}%`) } },
    });

    // NOTE: ?????? ????????? ?????? ???????????? ?????? ????????? ????????? ?????? ???????????? ???????????? ???????????? ??????
    const blockRows = await this.blocksRepository.find({
      relations: { user: true, blockedUser: true },
      where: { user: { id: id } },
    });
    const blockedIds = blockRows.map((blockRow) => blockRow.blockedUser.id);

    const foundUsers: UserDto[] = [];
    friendRows.forEach((row) => {
      if (blockedIds.includes(row.friend.id) === false) {
        const userDto = new UserDto(
          row.friend.id,
          row.friend.nickname,
          row.friend.image,
        );
        foundUsers.push(userDto);
      }
    });

    return foundUsers;
  }

  //ANCHOR: user friend
  async addFriend(id: number, friendId: number): Promise<UserDto> {
    // SELECT * FROM public."user"
    // WHERE "user"."id" = id;
    const user = await this.usersRepository.findOne({ where: [{ id: id }] });

    // SELECT * FROM public."user"
    // WHERE "user"."id" = friendId;
    const friend = await this.usersRepository.findOne({
      where: [{ id: friendId }],
    });
    if (friend === null) throw new NotFoundException('?????? ???????????????.');

    let rowId = 1;
    const maxFriendId = await this.friendsRepository
      .createQueryBuilder('friend')
      .select('MAX(friend.id)', 'id')
      .getRawOne();
    if (maxFriendId != null) rowId = maxFriendId.id + 1;

    const row1 = this.friendsRepository.create({
      id: rowId + 1,
      user: user,
      friend: friend,
    });
    const row2 = this.friendsRepository.create({
      id: rowId + 2,
      user: friend,
      friend: user,
    });

    this.friendsRepository.save(row1);
    this.friendsRepository.save(row2);

    const friendDto = new UserDto(friend.id, friend.nickname, friend.image);
    return friendDto;
  }

  async checkFriend(id: number, friendId: number): Promise<CheckFriendDto> {
    const friend = await this.friendsRepository.findOne({
      relations: ['user', 'friend'],
      where: { user: { id: id }, friend: { id: friendId } },
    });
    if (friend === null) return new CheckFriendDto(false);
    else return new CheckFriendDto(true);
  }

  async getFriends(id: number): Promise<FriendDto[]> {
    const user = await this.usersRepository.findOne({ where: [{ id: id }] });
    if (user === null) throw new NotFoundException('????????? ???????????? ????????????.');
    // SELECT * FROM public."friend"
    // LEFT JOIN "user" ON "user"."id" = friendId
    // WHERE "friend"."userId = "user"."id";
    const friendRows = await this.friendsRepository.find({
      relations: { user: true, friend: true },
      where: { user: { id: id } },
    });

    // SELECT * FROM public."block"
    // INNER JOIN "user" ON "user"."id" = blockedUserId
    // LEFT JOIN "block" ON "block"."blockedUserId" = "user"."id"
    // WHERE "block"."userId" = "user"."id";
    const blockedRows = await this.blocksRepository.find({
      relations: { user: true, blockedUser: true },
      where: { user: { id: id } },
    });
    const blockedIds = blockedRows.map((blockRow) => blockRow.blockedUser.id);

    const friendUsers: FriendDto[] = [];
    friendRows.forEach((friendRow) => {
      const friendDto = new FriendDto(
        friendRow.friend,
        blockedIds.includes(friendRow.friend.id),
      );
      friendUsers.push(friendDto);
    });

    return friendUsers;
  }

  async addRequest(requestorId: number, responserId: number): Promise<UserDto> {
    // SELECT * FROM public."user"
    // WHERE "user"."id" = id;
    const user = await this.usersRepository.findOne({
      where: [{ id: requestorId }],
    });

    // SELECT * FROM public."user"
    // WHERE "user"."id" = responserId;
    const responser = await this.usersRepository.findOne({
      where: [{ id: responserId }],
    });
    if (responser === null)
      throw new NotFoundException('????????? ???????????? ????????????.');

    const duplicateRequestCheck = await this.requestsRepository.findOne({
      where: { requestor: { id: requestorId }, responser: { id: responserId } },
    });
    const duplicateFriendCheck = await this.friendsRepository.findOne({
      where: { user: { id: requestorId }, friend: { id: responserId } },
    });
    if (duplicateRequestCheck !== null || duplicateFriendCheck !== null)
      throw new ConflictException();

    let rowId = 1;
    const maxRequestId = await this.requestsRepository
      .createQueryBuilder('request')
      .select('MAX(request.id)', 'id')
      .getRawOne();
    if (maxRequestId != null) rowId = maxRequestId.id + 1;

    const row = this.requestsRepository.create({
      id: rowId,
      requestor: user,
      responser: responser,
    });

    this.requestsRepository.save(row);

    const responserDto = new UserDto(
      responser.id,
      responser.nickname,
      responser.image,
    );

    return responserDto;
  }

  async getRequests(id: number): Promise<ServerRequestDto[]> {
    // SELECT * FROM public."request"
    // LEFT JOIN "user" ON "user"."id" = id
    // WHERE "request"."responserId" = "user"."id";
    const requests = await this.requestsRepository.find({
      relations: { requestor: true, responser: true },
      where: { responser: { id: id } },
    });

    const requestDtoList: ServerRequestDto[] = [];
    requests.forEach((request) => {
      const { id, requestor, responser } = request;
      const requestDto = new ServerRequestDto(id, requestor, responser);
      requestDtoList.push(requestDto);
    });

    return requestDtoList;
  }

  async getLadderStat(id: number): Promise<GameLadderDto> {
    const rank = await this.rankRepository.findOne({
      relations: { user: true },
      where: { user: { id: id } },
    });

    if (rank === null) throw new NotFoundException('?????? ????????? ????????????.');

    const ladderStat = new GameLadderDto(rank);
    return ladderStat;
  }

  async getGameRecords(id: number): Promise<GameRecordDto[]> {
    const gameRecords = await this.gamesRepository.find({
      relations: { user: true, opponent: true },
      where: { user: { id: id } },
      order: { id: 'DESC' },
    });

    const gameRecordDtoList: GameRecordDto[] = [];
    gameRecords.map((gameRecord) => {
      const gameRecordDto = new GameRecordDto(gameRecord);
      gameRecordDtoList.push(gameRecordDto);
    });

    return gameRecordDtoList;
  }

  // ANCHOR: Socket

  setConnection(userId: number, onGame: boolean) {
    let clientId: string;
    for (const [key, value] of this.connectionList) {
      if (value.userId === userId) {
        clientId = key;
      }
    }
    const connection = this.connectionList.get(clientId);
    if (connection === undefined) return null;
    this.connectionList.get(clientId).onGame = onGame;
    const connectionDto = new ConnectionDto(
      connection.userId,
      connection.onGame,
    );

    return connectionDto;
  }

  getConnectionList() {
    return this.connectionList;
  }

  handleDisconnect(client: Socket) {
    console.log('User Client disconnected', client.id);
    if (this.connectionList.get(client.id)) {
      const userId = this.connectionList.get(client.id).userId;
      this.connectionList.delete(client.id);
      const connectionDto: ConnectionDto = {
        userId: userId,
        onGame: false,
      };
      client.broadcast.emit('userLogOff', connectionDto);
    }
  }

  async handleLogOn(client: Socket, connectionDto: ConnectionDto) {
    const onlineUserList = Array.from(this.connectionList.values());
    onlineUserList.map((connection) => {
      if (connection.userId === connectionDto.userId) {
        throw new WsException(
          new WsExceptionDto(100, '?????? ????????? ?????? ????????????.'),
        );
      }
    });
    connectionDto.onGame = false;

    this.connectionList.set(client.id, {
      userId: connectionDto.userId,
      onGame: false,
    });

    client.broadcast.emit('changeUserStatus', connectionDto);
    const connectionsDto = new ConnectionsDto();
    connectionsDto.connections = onlineUserList.map((value) => {
      return new ConnectionDto(value.userId, value.onGame);
    });
    connectionsDto.push(connectionDto);

    return connectionsDto;
  }

  private invitationMap = new Map<number, number>();

  async handleInviteGame(client: Socket, inviteGameDto: ClientInviteGameDto) {
    const { hostId, opponentId, mode } = inviteGameDto;

    let opponentClientId = null;
    for (const [key, value] of this.connectionList) {
      if (value.userId === opponentId) opponentClientId = key;
    }
    if (opponentClientId === null)
      throw new WsException('????????? ?????? ??? ????????????.');
    if (this.connectionList.get(opponentClientId).onGame)
      throw new WsException('????????? ??????????????????.');

    client.broadcast.emit(
      'changeUserStatus',
      this.setConnection(inviteGameDto.hostId, true),
    );

    const host = await this.usersRepository.findOne({
      where: [{ id: hostId }],
    });
    const { id, nickname, image } = host;

    const serverInviteGameDto: ServerInviteGameDto = {
      host: {
        id,
        nickname,
        image,
      },
      mode: mode,
    };

    this.invitationMap.set(hostId, opponentId);
    client.to(opponentClientId).emit('inviteGame', serverInviteGameDto);
  }

  async handleCancelInvite(client: Socket, cancelInviteDto: CancelInviteDto) {
    const { hostId } = cancelInviteDto;

    const userId = this.connectionList.get(client.id).userId;
    client.broadcast.emit(
      'changeUserStatus',
      this.setConnection(userId, false),
    );
    this.invitationMap.delete(hostId);
    return { isDone: true };
  }

  async handleAcceptGame(
    client: Socket,
    server: Server,
    acceptGameDto: ClientAcceptGameDto,
  ) {
    let hostClientId: string = null;

    if (this.invitationMap.get(acceptGameDto.hostId) !== acceptGameDto.userId)
      throw new WsException('???????????? ????????? ???????????????.');
    for (const [key, value] of this.connectionList) {
      if (value.userId === acceptGameDto.hostId) hostClientId = key;
    }
    if (hostClientId === null) {
      throw new WsException('???????????? ?????? ??? ????????????.');
    }

    client.broadcast.emit(
      'changeUserStatus',
      this.setConnection(this.connectionList.get(client.id).userId, true),
    );

    const serverAcceptGameDto: ServerAcceptGameDto = {
      title: uuidv4(),
      mode: acceptGameDto.mode,
    };

    // TODO: ?????? ????????? ????????? ???
    server.to(client.id).emit('acceptGame', serverAcceptGameDto);
    server.to(hostClientId).emit('acceptGame', serverAcceptGameDto);
  }

  handleRejectGame(client: Socket, server: Server, userIdDto: UserIdDto) {
    let hostClientId: string = null;
    for (const [key, value] of this.connectionList) {
      if (value.userId === userIdDto.id) hostClientId = key;
    }
    if (hostClientId === null)
      throw new WsException('???????????? ?????? ??? ????????????.');

    this.connectionList.get(hostClientId).onGame = false;
    server.emit('changeUserStatus', { userId: userIdDto.id, onGame: false });

    server.to(hostClientId).emit('rejectGame');
  }

  async duplicateRequestCheck(
    client: Socket,
    clientRequestDto: ClientRequestDto,
  ) {
    const { requestorId, responserId } = clientRequestDto;

    const duplicateFriendCheck = await this.friendsRepository.findOne({
      where: { user: { id: requestorId }, friend: { id: responserId } },
    });
    if (duplicateFriendCheck !== null)
      throw new WsException(new WsExceptionDto(101, '?????? ???????????????.'));

    let duplicateRequestCheck = await this.requestsRepository.findOne({
      where: { requestor: { id: requestorId }, responser: { id: responserId } },
    });
    if (duplicateRequestCheck === null) {
      duplicateRequestCheck = await this.requestsRepository.findOne({
        where: {
          requestor: { id: responserId },
          responser: { id: requestorId },
        },
      });
    }
    if (duplicateRequestCheck !== null)
      throw new WsException(
        new WsExceptionDto(101, '?????? ?????? ????????? ???????????? ???????????????.'),
      );
  }

  async handleFriendRequest(
    client: Socket,
    clientRequestDto: ClientRequestDto,
  ) {
    const { requestorId, responserId } = clientRequestDto;

    await this.duplicateRequestCheck(client, clientRequestDto);

    const requestor = await this.usersRepository.findOneBy({ id: requestorId });
    const responser = await this.usersRepository.findOneBy({ id: responserId });

    let id = 1;
    const maxId = await this.requestsRepository
      .createQueryBuilder('request')
      .select('MAX(request.id)', 'id')
      .getRawOne();
    if (maxId.id !== null) id = maxId.id + 1;
    const request = this.requestsRepository.create({
      id: id,
      requestor: requestor,
      responser: responser,
    });
    await this.requestsRepository.save(request);

    let responserClientId: string = null;
    for (const [key, value] of this.connectionList) {
      if (value.userId === responserId) responserClientId = key;
    }
    if (responserClientId !== null) {
      const requestDto = new ServerRequestDto(request.id, requestor, responser);
      client.to(responserClientId).emit('friendRequest', requestDto);
    }
    return { isDone: true };
  }

  async handleAcceptFriendRequest(client: Socket, requestIdDto: RequestIdDto) {
    const request = await this.requestsRepository.findOne({
      relations: ['requestor', 'responser'],
      where: { id: requestIdDto.id },
    });
    const friendDto = await this.addFriend(
      request.requestor.id,
      request.responser.id,
    );

    await this.requestsRepository.delete(request.id);

    let requestorClientId: string = null;
    for (const [key, value] of this.connectionList) {
      if (value.userId === request.requestor.id) requestorClientId = key;
    }

    if (requestorClientId !== null)
      client.to(requestorClientId).emit('friendRequestAccepted', friendDto);

    return { isDone: true };
  }

  async handleRejectFriendRequest(client: Socket, requestIdDto: RequestIdDto) {
    const request = await this.requestsRepository.findOne({
      relations: ['requestor', 'responser'],
      where: { id: requestIdDto.id },
    });

    await this.requestsRepository.delete(request.id);

    let requestorClientId: string = null;
    for (const [key, value] of this.connectionList)
      if (value.userId === request.requestor.id) requestorClientId = key;

    if (requestorClientId !== null)
      client.to(requestorClientId).emit('friendRequestRejected');
  }

  async userInfo(user: any) {
    const { userId } = user;
    const userInfo = await this.getUser(userId);
    return userInfo;
  }
}
