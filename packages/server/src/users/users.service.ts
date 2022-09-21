import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';

@Injectable()
export class UserService {
  async addUser(createUserDto: CreateUserDto): Promise<User> {
    const { id, nickname, imageURL } = createUserDto;

    const user = new User(id, nickname, imageURL);

    return user;
  }
}
