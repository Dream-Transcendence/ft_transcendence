import { ApiProperty } from '@nestjs/swagger';
import { CHAT_TYPE } from '../rooms.entity';

export const AUTH_TYPE = {
  owner: 0,
  admin: 1,
} as const;
type AUTH_TYPE = typeof AUTH_TYPE[keyof typeof AUTH_TYPE];

export const STATUS_TYPE = {
  mute: 0,
  ban: 1,
} as const;
type STATUS_TYPE = typeof STATUS_TYPE[keyof typeof STATUS_TYPE];

export class CreateRoomDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  type: typeof CHAT_TYPE[keyof typeof CHAT_TYPE];

  @ApiProperty()
  salt: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  image: string;
}

export class AddChannelParticipantDto {
  @ApiProperty()
  participantId: number;

  @ApiProperty()
  auth: AUTH_TYPE;

  @ApiProperty()
  status: STATUS_TYPE;

  @ApiProperty()
  statusStartDate: Date;
}

export class PatchRoomNameDto {
  @ApiProperty()
  name: string;
}

export class PatchRoomImageDto {
  @ApiProperty()
  image: string;
}

export class RoomPasswordDto {
  @ApiProperty()
  salt: string;
}

export class PatchUserAuthDto {
  @ApiProperty()
  auth: AUTH_TYPE;
}

export class PatchUserStatusDto {
  @ApiProperty()
  status: STATUS_TYPE;
}
