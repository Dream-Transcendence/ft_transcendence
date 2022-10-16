import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/users/dto/user.dto';

const GAME_MODE = {
  ladder: 0,
  normal: 1,
  powerUp: 2,
  sizeUp: 3,
} as const;
export type GAME_MODE = typeof GAME_MODE[keyof typeof GAME_MODE];

export class GameLadderDto {
  @ApiProperty({ example: 1 })
  rank: number;

  @ApiProperty({ example: 3 })
  winCount: number;

  @ApiProperty({ example: 2 })
  loseCount: number;
}

export class GameRecordDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({
    example: { id: 1, nickname: 'dha', image: 'https://cdn.42.fr/dha.jpg' },
  })
  opponent: UserDto;

  @ApiProperty({ example: true })
  isWin: boolean;

  @ApiProperty({ example: true })
  isLadder: boolean;
}

export class GameRoomDto {
  id: string;

  leftPlayer: UserDto;
  rightPlayer: UserDto;

  mode: number;
}

export class MatchDto {
  userId: number;

  mode: GAME_MODE;
}

export class RoomTitleDto {
  title: string;
}

export class GameInfoDto {
  score: { left: number; right: number };
  ballPos: { x: number; y: number };
  paddlePos: { left: number; right: number };
  mode: number;
}
