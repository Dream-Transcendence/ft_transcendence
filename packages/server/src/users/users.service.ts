import { Inject, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './users.entity';

@Injectable()
export class UserService {
  private logger = new Logger('UsersService');
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<User>,
  ) {}

  async addUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const { id, nickname, image } = createUserDto;

    let user = this.usersRepository.create({
      id,
      nickname,
      image,
    });

    user = await this.usersRepository.save(user);

    const userDto = new UserDto(user.id, user.nickname, user.image);

    return userDto;
  }
}
