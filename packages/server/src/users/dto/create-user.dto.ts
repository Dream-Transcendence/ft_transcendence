import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  constructor(id: number, nickname: string, image: string, email: string) {
    this.id = id;
    this.nickname = nickname;
    this.image = image;
    this.email = email;
  }

  @ApiProperty({ example: '123' })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'dha' })
  @IsString()
  nickname: string;

  @ApiProperty({ example: 'https://cdn.42.fr/users/dha.jpg' })
  //@IsUrl()
  image: string;

  @ApiProperty({ example: 'dha@student.42seoul.kr' })
  @IsEmail()
  email: string;
}
