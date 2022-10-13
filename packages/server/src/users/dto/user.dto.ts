import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsObject, IsString, IsUrl } from 'class-validator';

export class UserDto {
  constructor(id: number, nickname: string, image: string) {
    this.id = id;
    this.nickname = nickname;
    this.image = image;
  }

  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ example: 'dha' })
  @IsString()
  nickname: string;

  @ApiProperty({ example: 'https://cdn.42.fr/users/dha.jpg' })
  // @IsUrl()
  image: string;
}

export class FriendDto {
  constructor(user: UserDto, isBlocked: boolean) {
    this.user = user;
    this.isBlocked = isBlocked;
  }

  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({
    example: {
      id: 1,
      nickname: 'dha',
      image: 'https://cdn.42.fr/users/dha.jpg',
    },
  })
  @IsObject()
  user: UserDto;

  @ApiProperty({ example: false })
  @IsBoolean()
  isBlocked: boolean;
}

export class UserIdDto {
  constructor(id: number) {
    this.id = id;
  }

  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;
}

export class DmUserDto {
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

  @ApiProperty()
  @IsBoolean()
  blocked: boolean;
}
