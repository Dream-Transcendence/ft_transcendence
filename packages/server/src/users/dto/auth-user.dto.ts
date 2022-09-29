import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class AuthUserDto {
  @ApiProperty()
  @IsBoolean()
  authenticated: boolean;
}
