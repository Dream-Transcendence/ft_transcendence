import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
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
  constructor(name: string, type: CHAT_TYPE, image: string) {
    this.name = name;
    this.type = type;
    this.image = image;
  }

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(3)
  type?: CHAT_TYPE;

  @ApiProperty()
  @IsUrl()
  image: string;
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
  @ApiProperty()
  @IsObject({ each: true })
  dmList: GetUserRoomDto[];

  @ApiProperty()
  @IsObject({ each: true })
  channelList: GetUserRoomDto[];
}

export class GetUserRoomDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsUrl()
  image: string;

  @ApiProperty()
  @IsInt()
  RecvMessageCount: number;
}

export class createDmDto {
  @ApiProperty()
  @IsInt()
  userId: number;

  @ApiProperty()
  @IsInt()
  participantId: number;
}

export class RoomPasswordDto {
  @ApiProperty()
  @IsString()
  salt: string;
}

export class PatchChannelInfoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsUrl()
  image: string;

  @ApiProperty()
  @IsString()
  salt: string;
}

export class PatchUserInfoDto {
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
