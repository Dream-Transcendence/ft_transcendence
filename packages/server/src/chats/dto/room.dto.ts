import { ApiProperty } from '@nestjs/swagger';
import { AUTH_TYPE, CHAT_TYPE, STATUS_TYPE } from './rooms.dto';
import { UserDto } from '../../users/dto/user.dto';

export class RoomDto {
  constructor(
    id: number,
    name: string,
    type: CHAT_TYPE,
    salt: string,
    title: string,
    image: string,
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.salt = salt;
    this.title = title;
    this.image = image;
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type: CHAT_TYPE;

  @ApiProperty()
  salt: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  image: string;
}

export class ChannelParticipantDto {
  constructor(
    id: number,
    user: UserDto,
    auth: AUTH_TYPE,
    status: STATUS_TYPE,
    statusStartDate: Date,
  ) {
    this.id = id;
    this.user = user;
    this.auth = auth;
    this.status = status;
    this.statusStartDate = statusStartDate;
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  user: UserDto;

  @ApiProperty()
  auth: AUTH_TYPE;

  @ApiProperty()
  status: STATUS_TYPE;

  @ApiProperty()
  statusStartDate: Date;
}
