import { ApiProperty } from '@nestjs/swagger';
import { CHAT_TYPE } from './rooms.dto';

export class RoomDto {
  constructor(
    id: number,
    name: string,
    type: CHAT_TYPE,
    salt: string,
    title: string,
    image?: string,
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
  image?: string;
}
