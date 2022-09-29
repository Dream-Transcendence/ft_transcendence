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

export class UserIdDto {
  constructor(id: number) {
    this.id = id;
  }

  @ApiProperty()
  id: number;
}
