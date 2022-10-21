import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsObject, IsString, IsUrl } from 'class-validator';
import { request } from 'http';
import { User } from '../users.entity';

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
  // //@IsUrl()
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
  // //@IsUrl()
  image: string;

  @ApiProperty()
  @IsBoolean()
  blocked: boolean;
}

export class ClientInviteGameDto {
  hostId: number;
  opponentId: number;
  mode: number;
}

export class ServerInviteGameDto {
  host: UserDto;
  mode: number;
}

export class ClientAcceptGameDto {
  hostId: number;
  mode: number;
}

export class ServerAcceptGameDto {
  title: string;
  mode: number;
}

export class Connection {
  userId: number;
  onGame: boolean;
}

export class ClientRequestDto {
  requestorId: number;
  responserId: number;
}

export class ServerRequestDto {
  constructor(id: number, requestor: User, responser: User) {
    console.log(requestor, responser);
    this.id = id;
    this.requestor = new UserDto(
      requestor.id,
      requestor.nickname,
      requestor.image,
    );
    this.responser = new UserDto(
      responser.id,
      responser.nickname,
      responser.image,
    );
  }

  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({
    example: {
      id: 1,
      nickname: 'dha',
      image: 'https://cdn.42.fr/users/dha.jpg',
    },
  })
  requestor: UserDto;
  @ApiProperty({
    example: {
      id: 2,
      nickname: 'junghan',
      image: 'https://cdn.42.fr/users/junghan.jpg',
    },
  })
  responser: UserDto;
}

export class RequestIdDto {
  id: number;
}
