import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, isURL } from 'class-validator';

export class PatchUserDto {
  @ApiProperty({ example: 'dha' })
  @IsString()
  @IsOptional()
  nickname: string;

  @ApiProperty({ example: 'https://cdn.42.fr/users/dha.jpg' })
  // //@IsUrl()
  @IsOptional()
  image: string;
}
