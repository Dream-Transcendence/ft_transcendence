import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, isURL } from 'class-validator';

export class PatchImageDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

export class PatchNicknameDto {
  @ApiProperty({ example: 'dha' })
  @IsString()
  @IsOptional()
  nickname: string;
}
