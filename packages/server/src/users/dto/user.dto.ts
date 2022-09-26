import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  constructor(id: number, nickname: string, image: string) {
    this.id = id;
    this.nickname = nickname;
    this.image = image;
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  image: string;
}
