import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
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
} from './dto/user.dto';
import { v4 as uuidv4 } from 'uuid';
import { Auth, Block, Friend, Request, User } from './users.entity';

@Injectable()
export class UserService {
  private logger = new Logger('UsersService');
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

  async getRequests(id: number): Promise<UserDto[]> {
    // SELECT * FROM public."request"
    // LEFT JOIN "user" ON "user"."id" = id
    // WHERE "request"."responserId" = "user"."id";
    const requests = await this.requestsRepository.find({
      relations: { requestor: true, responser: true },
      where: { responser: { id: id } },
    });

    const requestors: UserDto[] = [];
    requests.forEach((request) => {
      const userDto = new UserDto(
        request.requestor.id,
        request.requestor.nickname,
        request.requestor.image,
      );
      requestors.push(userDto);
    });

    return requestors;
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
  // async handleLogOn(
  //   userId: number,
  //   onlineUserList: number[],
  // ): Promise<ConnectionsDto> {
  //   const friendRows = await this.friendsRepository.find({
  //     relations: { user: true, friend: true },
  //     where: { user: { id: userId } },
  //   });
  //   const onlineFriendList: number[] = [];

  //   friendRows.forEach((friendRow) => {
  //     console.log(friendRow.friend);
  //   });

  //   console.log(`onlineUserList: ${onlineUserList}, userId: ${userId}`);

  //   friendRows.forEach((friendRow) => {
  //     if (onlineUserList.includes(friendRow.friend.id)) {
  //       onlineFriendList.push(friendRow.friend.id);
  //     }
  //   });
  //   console.log(`onlineFriendList: ${onlineFriendList}`);

  //   return { connections: onlineFriendList };
  // }

  async handleInviteGame(
    client: Socket,
    inviteGameDto: ClientInviteGameDto,
    opponentClientId: string,
  ): Promise<void> {
    const { hostId, mode } = inviteGameDto;
    const host = await this.usersRepository.findOne({
      where: [{ id: hostId }],
    });

    const serverInviteGameDto: ServerInviteGameDto = {
      host: {
        id: host.id,
        nickname: host.nickname,
        image: host.image,
      },
      mode: mode,
    };

    client.to(opponentClientId).emit('inviteGame', serverInviteGameDto);
  }

  async handleAcceptGame(
    client: Socket,
    acceptGameDto: ClientAcceptGameDto,
  ): Promise<ServerAcceptGameDto> {
    const { mode } = acceptGameDto;
    const serverAcceptGameDto: ServerAcceptGameDto = {
      title: uuidv4(),
      mode: mode,
    };

    return serverAcceptGameDto;
  }
}
