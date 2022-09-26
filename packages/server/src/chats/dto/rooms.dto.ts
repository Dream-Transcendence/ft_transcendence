import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsUrl, Max, Min } from 'class-validator';

// union type들 모아두는 파일들 따로 만들기
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

export class CreateRoomDto {
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
  // 비밀번호 길이 제한 길이는 비밀번호가 존재하지 않을 수도 있으니 제한X
  // 없을 때는 빈 문자열로 넘어오게 하기
  salt: string;

  @ApiProperty()
  @IsNotEmpty()
  title: string;
}

export class AddChannelParticipantDto {
  @ApiProperty()
  @IsInt()
  participantId: number;
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

export class PatchUserAuthDto {
  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(1)
  auth: AUTH_TYPE;
}

export class PatchUserStatusDto {
  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(1)
  status: STATUS_TYPE;
}
