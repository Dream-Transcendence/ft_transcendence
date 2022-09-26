import { ApiProperty } from '@nestjs/swagger';

export class PatchUserNicknameDto {
  @ApiProperty()
  nickname: string;
}

export class PatchUserImageURLDto {
  @ApiProperty()
  imageURL: string;
}
