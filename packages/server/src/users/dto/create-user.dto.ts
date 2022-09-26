import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  constructor(id: number, nickname: string, image: string, email: string) {
    this.id = id;
    this.nickname = nickname;
    this.image = image;
    this.email = email;
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  email: string;
}
