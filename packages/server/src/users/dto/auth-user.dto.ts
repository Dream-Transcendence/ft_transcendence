import { ApiProperty } from '@nestjs/swagger';

export class AuthUserDto {
  @ApiProperty()
  authenticated: boolean;
}
