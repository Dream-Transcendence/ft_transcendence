import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, isURL } from 'class-validator';

export class PatchUserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  nickname: string;

  @ApiProperty()
  @IsUrl()
  @IsOptional()
  image: string;
}
