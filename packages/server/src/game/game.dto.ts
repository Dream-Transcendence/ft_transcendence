import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/users/dto/user.dto';
import { User } from '../users/users.entity';
import { Socket } from 'socket.io';

const GAME_MODE = {
  ladder: 0,
  normal: 1,
  powerUp: 2,
  sizeUp: 3,
} as const;
export type GAME_MODE = typeof GAME_MODE[keyof typeof GAME_MODE];

const MOVE_DIR = {
  up: 0,
  down: 1,
} as const;
export type MOVE_DIR = typeof MOVE_DIR[keyof typeof MOVE_DIR];

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
  title: string;
  leftPlayer: UserDto;
  rightPlayer: UserDto;
  ballPos: { x: number; y: number };
  paddlePos: { left: number; right: number };
  score: { left: number; right: number };
  mode: number;
}

export class MatchDto {
  userId: number;
}

export class RoomTitleDto {
  title: string;
}

export class GameInfoDto {
  ballPos: { x: number; y: number };
  paddlePos: { left: number; right: number };
}
export class GameScoreDto {
  score: { left: number; right: number };
}

export class MovePaddleDto {
  title: string;
  playerId: number;
  moveDir: MOVE_DIR;
  // 변하지 않는 변수는 따로 빼도 좋을듯
}

export class MatchingInfo {
  constructor(public readonly userId: number, public readonly socket: Socket) {}
}

export class GameInfo {
  constructor(private player1: User, private player2: User) {
    this.player = { left: player1, right: player2 };
    this.score = { left: 0, right: 0 };
    this.ballPos = { x: 240, y: 125 };
    this.ballSpeed = { x: 3, y: -3 };
    this.paddlePos = { left: (250 - 75) / 2, right: (250 - 75) / 2 };
    this.mode = 0;
    // mode도 받기
  }

  player: { left: User; right: User };
  score: { left: number; right: number };
  ballPos: { x: number; y: number };
  ballSpeed: { x: number; y: number };
  paddlePos: { left: number; right: number };
  mode: GAME_MODE;

  public getGameRoomDto(title: string): GameRoomDto {
    return {
      title: title,
      leftPlayer: {
        id: this.player.left.id,
        nickname: this.player.left.nickname,
        image: this.player.left.image,
      },
      rightPlayer: {
        id: this.player.right.id,
        nickname: this.player.right.nickname,
        image: this.player.right.image,
      },
      ballPos: { x: this.ballPos.x, y: this.ballPos.y },
      paddlePos: { left: this.paddlePos.left, right: this.paddlePos.right },
      score: { left: this.score.left, right: this.score.right },
      mode: this.mode,
    };
  }

  // public getGameInfoDto(): GameInfoDto {
  //   return {
  //     score: this.score,
  //     ballPos: this.ballPos,
  //     paddlePos: this.paddlePos,
  //     mode: this.mode,
  //   };
  // }

  public getGameInfoDto(): GameInfoDto {
    return {
      ballPos: this.ballPos,
      paddlePos: this.paddlePos,
    };
  }

  public getGameScoreDto(): GameScoreDto {
    return {
      score: this.score,
    };
  }
}
