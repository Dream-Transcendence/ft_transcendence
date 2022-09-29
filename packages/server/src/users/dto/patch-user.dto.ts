import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, isURL } from 'class-validator';

export class PatchUserDto {
  @ApiProperty()
  @IsString()
  nickname: string;

  @ApiProperty()
  @IsUrl()
  image: string;
}
