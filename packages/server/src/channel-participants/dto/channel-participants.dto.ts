import { ApiProperty } from '@nestjs/swagger';
import { AUTH_TYPE, STATUS_TYPE } from '../../rooms/dto/rooms.dto';

export class CreateChannelParticipantDto {
  @ApiProperty()
  participantId: number;

  @ApiProperty()
  auth: AUTH_TYPE;

  @ApiProperty()
  status: STATUS_TYPE;

  @ApiProperty()
  StatusStartDate: Date;
}
