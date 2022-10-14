import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/users/dto/user.dto';

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

// 변하지 않는 변수는 따로 빼도 좋을듯
export interface Game {
  // ballRadius: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  // canvasWidth: number;
  // canvasHeight: number;
  leftPaddleY: number;
  rightPaddleY: number;
  // paddleWidth: number;
  // paddleHeight: number;
  leftScore: number;
  rightScore: number;
  // 게임 참가자 userId도 저장
}
