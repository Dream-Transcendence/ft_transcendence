import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  imageURL: string;
}
