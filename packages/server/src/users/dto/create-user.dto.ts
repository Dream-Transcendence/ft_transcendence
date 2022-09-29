import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUrl } from 'class-validator';

export class CreateUserDto {
  constructor(nickname: string, image: string, email: string) {
    this.nickname = nickname;
    this.image = image;
    this.email = email;
  }

  @ApiProperty()
  @IsString()
  nickname: string;

  @ApiProperty()
  @IsUrl()
  image: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}
