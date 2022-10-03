import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsUrl, Max, Min } from 'class-validator';
import { RoomDto } from './room.dto';

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
  @IsString()
  salt: string;

  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsInt()
  participantIds: number[];
}

export class GetUserRoomsDto {
  @ApiProperty()
  dmList: GetUserRoomDto[];

  @ApiProperty()
  channelList: GetUserRoomDto[];
}

export class GetUserRoomDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  RecvMessageCount: number;
}

export class createDmDto {
  @ApiProperty()
  @IsInt()
  userId: number;

  @ApiProperty()
  @IsInt()
  participantId: number;

  @ApiProperty()
  @IsNotEmpty()
  title: string;
}

export class RoomPasswordDto {
  @ApiProperty()
  @IsString()
  salt: string;
}

export class PatchRoomInfoDto {
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
