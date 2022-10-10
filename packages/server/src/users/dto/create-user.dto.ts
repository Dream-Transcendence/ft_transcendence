import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUrl } from 'class-validator';

export class CreateUserDto {
  constructor(nickname: string, image: string, email: string) {
    this.nickname = nickname;
    this.image = image;
    this.email = email;
  }

  @ApiProperty({ example: 'dha' })
  @IsString()
  nickname: string;

  @ApiProperty({ example: 'https://cdn.42.fr/users/dha.jpg' })
  @IsUrl()
  image: string;

  @ApiProperty({ example: 'dha@student.42seoul.kr' })
  @IsEmail()
  email: string;
}
