import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsUrl } from 'class-validator';

export class UserDto {
  constructor(id: number, nickname: string, image: string) {
    this.id = id;
    this.nickname = nickname;
    this.image = image;
  }

  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsString()
  nickname: string;

  @ApiProperty()
  @IsUrl()
  image: string;
}

export class FriendDto {
  constructor(user: UserDto, isBlocked: boolean) {
    this.user = user;
    this.isBlocked = isBlocked;
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  user: UserDto;

  @ApiProperty()
  isBlocked: boolean;
}

export class UserIdDto {
  constructor(id: number) {
    this.id = id;
  }

  @ApiProperty()
  id: number;
}
