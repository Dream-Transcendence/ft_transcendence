import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './users.entity';

@Injectable()
export class UserService {
  async addUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const { id, nickname, imageURL } = createUserDto;

    const user = new UserDto() {
      id,
      nickname,
      imageURL,
    };


    return user;
  }
}
