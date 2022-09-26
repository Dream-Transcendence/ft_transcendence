import { Inject, Injectable, Logger, Param } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { AuthUserDto } from './dto/auth-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { Auth, Block, Friend, User } from './users.entity';

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
  ) {}

  async addUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const { id, nickname, image, email } = createUserDto;

    let user = this.usersRepository.create({
      id,
      nickname,
      image,
    });

    user = await this.usersRepository.save(user);

    const auth = this.authRepository.create({
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
    const userDto = new UserDto(user.id, user.nickname, user.image);

    return userDto;
  }

  async patchUser(id: number, userDto: UserDto): Promise<UserDto> {
    const { nickname, image } = userDto;

    const user = await this.usersRepository.findOne({ where: [{ id: id }] });

    if (nickname) user.nickname = nickname;
    if (image) user.image = image;

    await this.usersRepository.save(user);

    const newUserDto = new UserDto(user.id, user.nickname, user.image);

    return newUserDto;
  }

  async getAuth(id: number): Promise<AuthUserDto> {
    // SELECT * FROM public."auth"
    // LEFT JOIN "user" ON "user"."id" = id
    const auth = await this.authRepository.findOne({
      relations: { user: true },
      where: { user: { id: id } },
    });

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

    auth.authenticated = !auth.authenticated;
    await this.authRepository.save(auth);

    const authUserDto = new AuthUserDto();
    authUserDto.authenticated = auth.authenticated;

    return authUserDto;
  }

  async blockUser(id: number, userId: number): Promise<UserDto> {
    const user = await this.usersRepository.findOne({ where: [{ id: id }] });
    const blockedUser = await this.usersRepository.findOne({
      where: [{ id: userId }],
    });
    let block = this.blocksRepository.create({
      blockedTime: new Date(),
      user: user,
      blockedUser: blockedUser,
    });

    block = await this.blocksRepository.save(block);

    return block.blockedUser;
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

  //TODO: 채팅

  async addFriend(id: number, userId: number): Promise<UserDto> {
    // SELECT * FROM public."user"
    // WHERE "user"."id" = id;
    const user = await this.usersRepository.findOne({ where: [{ id: id }] });

    // SELECT * FROM public."user"
    // WHERE "user"."id" = userId;
    const friend = await this.usersRepository.findOne({
      where: [{ id: userId }],
    });

    const row1 = this.friendsRepository.create({
      user: user,
      friend: friend,
    });
    const row2 = this.friendsRepository.create({
      user: friend,
      friend: user,
    });

    this.friendsRepository.save(row1);
    this.friendsRepository.save(row2);

    const friendDto = new UserDto(friend.id, friend.nickname, friend.image);

    return friendDto;
  }

  async getFriends(id: number): Promise<UserDto[]> {
    // SELECT * FROM public."friend"
    // LEFT JOIN "user" ON "user"."id" = id
    // WHERE "friend"."userId" = "user"."id";
    const friends = await this.friendsRepository.find({
      relations: { user: true, friend: true },
      where: { user: { id: id } },
    });

    const friendUsers: UserDto[] = [];
    friends.forEach((friend) => {
      const userDto = new UserDto(
        friend.friend.id,
        friend.friend.nickname,
        friend.friend.image,
      );
    });

    return friendUsers;
  }
}