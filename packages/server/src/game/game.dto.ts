import { ApiProperty } from '@nestjs/swagger';

export class GameLadderDto {
  @ApiProperty()
  rank: number;

  @ApiProperty()
  winCount: number;

  @ApiProperty()
  loseCount: number;
}

export class GameRecordDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  opponent: string;

  @ApiProperty()
  isWin: boolean;

  @ApiProperty()
  isLadder: boolean;
}
