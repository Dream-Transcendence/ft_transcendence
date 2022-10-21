import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { GetUserRoomDto, GetUserRoomsDto } from 'src/chats/dto/rooms.dto';
import { ChannelParticipant, DmParticipant } from 'src/chats/rooms.entity';
import { EntityNotFoundError, Like, Not, Repository } from 'typeorm';
import { AuthUserDto } from './dto/auth-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import {
  FriendDto,
  ClientInviteGameDto,
  UserDto,
  ServerInviteGameDto,
  ClientAcceptGameDto,
  ServerAcceptGameDto,
  Connection,
  UserIdDto,
  ServerRequestDto,
  RequestIdDto,
  ClientRequestDto,
} from './dto/user.dto';
import { v4 as uuidv4 } from 'uuid';
import { Auth, Block, Friend, Request, User } from './users.entity';
import { ConnectionDto, ConnectionsDto } from './dto/connect-user.dto';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class UserService {
  private logger = new Logger('UsersService');

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
  ) {}

  //ANCHOR: user management
  async addUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const { id, nickname, image, email } = createUserDto;

    // FIXME: 테스트용
    // let id = 1;
    // const maxUserId = await this.usersRepository
    //   .createQueryBuilder('user')
    //   .select('MAX(user.id)', 'id')
    //   .getRawOne();
    // if (maxUserId.id !== null) id = maxUserId.id + 1;

    // console.log(maxUserId.id);
    let user = this.usersRepository.create({
      id,
      nickname,
      image,
    });
    user = await this.usersRepository.save(user);

    // FIXME: 테스트용
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

    const userDto = new UserDto(user.id, user.nickname, user.image);
    return userDto;
  }

  async getUser(id: number): Promise<UserDto> {
    const user = await this.usersRepository.findOne({ where: [{ id: id }] });
    // if (user === null) throw new EntityNotFoundError(User, id);

    if (!user) return null;
    const userDto = new UserDto(user.id, user.nickname, user.image);
    return userDto;
  }

  async patchUser(id: number, userDto: PatchUserDto): Promise<UserDto> {
    const { nickname, image } = userDto;

    const user = await this.usersRepository.findOne({ where: [{ id: id }] });

    if (nickname) {
      // SELECT COUNT(*) FROM public."user" WHERE "nickname" = $1;
      // COUNT를 통해서 중복된 닉네임의 수를 확인할 수도 있다.
      const duplicateCheck = await this.usersRepository.findOne({
        where: { nickname: nickname },
      });
      if (duplicateCheck !== null) throw new ConflictException();

      user.nickname = nickname;
    }
    if (image) user.image = image;

    await this.usersRepository.save(user);

    const newUserDto = new UserDto(user.id, user.nickname, user.image);
    return newUserDto;
  }

  async getAuth(id: number): Promise<AuthUserDto> {
    // SELECT * FROM public."auth"
    // LEFT JOIN "user" ON "user"."id" = id
    // WHERE "auth"."userId" = "user"."id";
    const auth = await this.authRepository.findOne({
      relations: { user: true },
      where: { user: { id: id } },
    });
    // if (auth === null) throw new EntityNotFoundError(Auth, id);

    const authUserDto = new AuthUserDto();
    authUserDto.authenticated = auth.authenticated;

    return authUserDto;
  }

  // TODO: 인증하는 로직 추가
  async patchAuth(id: number): Promise<AuthUserDto> {
    const auth = await this.authRepository.findOne({
      relations: { user: true },
      where: { user: { id: id } },
    });
    // if (auth === null) throw new EntityNotFoundError(Auth, id);

    auth.authenticated = !auth.authenticated;
    await this.authRepository.save(auth);

    const authUserDto = new AuthUserDto();
    authUserDto.authenticated = auth.authenticated;

    return authUserDto;
  }

  // ANCHOR: user block
  async blockUser(id: number, userId: number): Promise<UserDto> {
    const user = await this.usersRepository.findOne({ where: [{ id: id }] });
    const blockedUser = await this.usersRepository.findOne({
      where: [{ id: userId }],
    });
    if (blockedUser === null) throw new EntityNotFoundError(User, id);

    // FIXME: 테스트용
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

      console.log('잘 돌아가고 있니?');
      const userRoomDto: GetUserRoomDto = {
        id: room.id,
        name: opponent.user.nickname,
        image: opponent.user.image,
        // TODO: recvMessageCount 로직 추가
        recvMessageCount: 0,
        blocked: row !== null,
      };
      dmList.push(userRoomDto);
    });
    await Promise.all(promises);

    return { channelList, dmList };
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
    if (friend === null) throw new EntityNotFoundError(User, friendId);

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

  async getFriend(id: number, friendId: number): Promise<UserDto> {
    const friend = await this.friendsRepository.findOne({
      relations: ['user', 'friend'],
      where: { user: { id: id }, friend: { id: friendId } },
    });
    if (friend === null) throw new EntityNotFoundError(User, friendId);

    const friendDto = new UserDto(
      friend.friend.id,
      friend.friend.nickname,
      friend.friend.image,
    );
    return friendDto;
  }

  async getFriends(id: number): Promise<FriendDto[]> {
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
    if (responser === null) throw new EntityNotFoundError(User, responserId);

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

  //ANCHOR: user search
  async searchUser(nickname: string): Promise<UserDto[]> {
    // SELECT * FROM public."user"
    // WHERE "user"."nickname" LIKE '%nickname%';
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
    const friendRows = await this.friendsRepository.find({
      relations: { user: true, friend: true },
      where: { user: { id: id }, friend: { nickname: Like(`%${nickname}%`) } },
    });

    // NOTE: 차단 여부를 같이 보내주지 않고 차단한 유저는 검색 결과에서 제외하는 방식으로 구현
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

  // ANCHOR: Socket

  setConnection(userId: number, server: Server | Socket, onGame: boolean) {
    let clientId: string;
    for (const [key, value] of this.connectionList) {
      if (value.userId === userId) {
        clientId = key;
      }
    }
    this.connectionList.get(clientId).onGame = onGame;
    const connection = this.connectionList.get(clientId);
    const connectionDto = new ConnectionDto(
      connection.userId,
      connection.onGame,
    );

    if (server instanceof Server) {
      server.emit('changeUserStatus', {
        connection: connectionDto,
      });
    } else {
      server.broadcast.emit('changeUserStatus', {
        connection: connectionDto,
      });
    }
  }

  getConnectionList() {
    return this.connectionList;
  }

  handleDisconnect(client: Socket) {
    console.log('User Client disconnected', client.id);
    const userId = this.connectionList.get(client.id).userId;

    client.broadcast.emit('userLogOff', { userId: userId });

    this.connectionList.delete(client.id);
  }

  async handleLogOn(client: Socket, connectionDto: ConnectionDto) {
    const onlineUserList = Array.from(this.connectionList.values());

    this.connectionList.set(client.id, {
      userId: connectionDto.userId,
      onGame: false,
    });

    client.broadcast.emit('changeUserStatus', {
      connection: { userId: connectionDto.userId, onGame: false },
    });

    const connectionsDto = new ConnectionsDto();
    connectionsDto.connections = onlineUserList.map((value) => {
      return new ConnectionDto(value.userId, value.onGame);
    });

    return connectionsDto;
  }

  async handleInviteGame(client: Socket, inviteGameDto: ClientInviteGameDto) {
    const { hostId, opponentId, mode } = inviteGameDto;

    let opponentClientId = null;
    for (const [key, value] of this.connectionList) {
      if (value.userId === opponentId) opponentClientId = key;
    }
    if (opponentClientId === null)
      throw new WsException('상대를 찾을 수 없습니다.');

    this.setConnection(inviteGameDto.hostId, client, true);

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

    client.to(opponentClientId).emit('inviteGame', serverInviteGameDto);
  }

  async handleAcceptGame(
    client: Socket,
    server: Server,
    acceptGameDto: ClientAcceptGameDto,
  ) {
    let hostClientId: string = null;

    for (const [key, value] of this.connectionList) {
      if (value.userId === acceptGameDto.hostId) hostClientId = key;
    }
    if (hostClientId === null)
      throw new WsException('호스트를 찾을 수 없습니다.');

    this.setConnection(this.connectionList.get(client.id).userId, client, true);
    const serverAcceptGameDto: ServerAcceptGameDto = {
      title: uuidv4(),
      mode: acceptGameDto.mode,
    };

    // TODO: 이건 테스트 해봐야 함
    server.to(client.id).emit('acceptGame', serverAcceptGameDto);
    server.to(hostClientId).emit('acceptGame', serverAcceptGameDto);
  }

  handleRejectGame(client: Socket, server: Server, userIdDto: UserIdDto) {
    let hostClientId: string = null;
    for (const [key, value] of this.connectionList) {
      if (value.userId === userIdDto.id) hostClientId = key;
    }
    if (hostClientId === null)
      throw new WsException('호스트를 찾을 수 없습니다.');

    this.connectionList.get(hostClientId).onGame = false;

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
      throw new WsException('이미 친구입니다.');

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
      throw new WsException('이미 친구 요청을 보냈거나 받았습니다.');
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
  }

  async handleAcceptFriendRequest(client: Socket, requestIdDto: RequestIdDto) {
    const request = await this.requestsRepository.findOneBy({
      id: requestIdDto.id,
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
  }

  async handleRejectFriendRequest(client: Socket, requestIdDto: RequestIdDto) {
    const request = await this.requestsRepository.findOneBy({
      id: requestIdDto.id,
    });

    await this.requestsRepository.delete(request.id);

    let requestorClientId: string = null;
    for (const [key, value] of this.connectionList)
      if (value.userId === request.requestor.id) requestorClientId = key;

    if (requestorClientId !== null)
      client.to(requestorClientId).emit('friendRequestRejected');
  }
}
