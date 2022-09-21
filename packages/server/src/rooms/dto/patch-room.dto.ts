import { ApiProperty } from '@nestjs/swagger';

export class PatchRoomNameDto {
  @ApiProperty()
  name: string;
}

export class PatchRoomImageDto {
  @ApiProperty()
  image: string;
}
