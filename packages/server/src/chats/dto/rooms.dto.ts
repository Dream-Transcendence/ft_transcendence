import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import { UserDto } from '../../users/dto/user.dto';

// FIXME[epic=sonkang] union type들 모아두는 파일들 따로 만들기
const CHAT_TYPE = {
  dm: 0,
  public: 1,
  protected: 2,
  private: 3,
} as const;
export type CHAT_TYPE = typeof CHAT_TYPE[keyof typeof CHAT_TYPE];

const AUTH_TYPE = {
  owner: 0,
  admin: 1,
} as const;
export type AUTH_TYPE = typeof AUTH_TYPE[keyof typeof AUTH_TYPE];

const STATUS_TYPE = {
  mute: 0,
  ban: 1,
} as const;
export type STATUS_TYPE = typeof STATUS_TYPE[keyof typeof STATUS_TYPE];

// ANCHOR Channel DTO
export class ChannelDto {
  constructor(
    id: number,
    name: string,
    type: CHAT_TYPE,
    image: string,
    title: string,
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.image = image;
    this.title = title;
  }
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(3)
  type?: CHAT_TYPE;

  @ApiProperty()
  //@IsUrl()
  image: string;

  @ApiProperty()
  @IsString()
  title: string;
}
export class ChannelInfoDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(3)
  type?: CHAT_TYPE;

  @ApiProperty()
  //@IsUrl()
  image: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsInt()
  personnel: number;
}

export class GetRoomInfoDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(3)
  type: CHAT_TYPE;

  @ApiProperty()
  @IsUrl()
  image: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsBoolean()
  blocked?: boolean;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(1)
  auth?: AUTH_TYPE;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(1)
  status?: STATUS_TYPE;
}

export class ChannelParticipantDto {
  constructor(
    user: UserDto,
    auth: AUTH_TYPE,
    status: STATUS_TYPE,
    // statusStartDate: Date,
    blocked: boolean,
  ) {
    this.user = user;
    this.auth = auth;
    this.status = status;
    // this.statusStartDate = statusStartDate;
    this.blocked = blocked;
  }

  @ApiProperty()
  @IsObject()
  user: UserDto;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(1)
  auth: AUTH_TYPE;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(1)
  status: STATUS_TYPE;

  // @ApiProperty()
  // statusStartDate: Date;

  @ApiProperty()
  @IsBoolean()
  blocked: boolean;
}
export class CreateChannelDto {
  @ApiProperty()
  @IsInt()
  userId: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(3)
  type: CHAT_TYPE;

  @ApiProperty()
  @IsOptional()
  @IsString()
  salt: string;

  @ApiProperty()
  @IsInt({ each: true })
  participantIds: number[];
}

export class GetUserRoomsDto {
  @ApiProperty({
    example: [
      {
        id: 2,
        name: '채팅방',
        image: 'https://m.media-amazon.com/images/I/31VjU29FP+L.png',
        recvMessageCount: 5,
      },
    ],
  })
  @IsObject({ each: true })
  channelList: GetUserRoomDto[];

  @ApiProperty({
    example: [
      {
        id: 1,
        name: 'dha',
        image: 'https://cdn.intra.42.fr/users/dha.jpg',
        recvMessageCount: 5,
        blocked: false,
      },
    ],
  })
  @IsObject({ each: true })
  dmList: GetUserRoomDto[];
}

export class GetUserRoomDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  //@IsUrl()
  image: string;

  @ApiProperty()
  @IsInt()
  recvMessageCount: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  blocked?: boolean;
}

export class CreateDmDto {
  @ApiProperty()
  @IsInt()
  userId: number;

  @ApiProperty()
  @IsInt()
  participantId: number;
}

export class DmDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsUrl()
  image: string;
}

export class RoomPasswordDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  salt: string;
}

export class PatchChannelInfoDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  //@IsUrl()
  @IsOptional()
  image: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  salt: string;
}

export class PatchUserInfoDto {
  @IsNumber()
  @IsNotEmpty()
  roomId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(1)
  @IsOptional()
  auth?: AUTH_TYPE;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(1)
  @IsOptional()
  status?: STATUS_TYPE;
}

export class EnterChannelDto {
  @IsNumber()
  @IsNotEmpty()
  roomId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsOptional()
  salt: string;
}

export class LeaveChannelDto {
  @IsNumber()
  @IsNotEmpty()
  roomId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

export class SendMessageDto {
  @IsNumber()
  @IsNotEmpty()
  roomId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  body: string;
}
export class MessageDto {
  @IsObject()
  @IsNotEmpty()
  user: UserDto;

  @IsString()
  @IsNotEmpty()
  body: string;
}
