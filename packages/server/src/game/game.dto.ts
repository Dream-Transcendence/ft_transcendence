import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/users/dto/user.dto';
import { Game, Rank, User } from '../users/users.entity';
import { Socket } from 'socket.io';

const GAME_MODE = {
  ladder: 0,
  normal: 1,
  powerUp: 2,
  sizeDown: 3,
} as const;
export type GAME_MODE = typeof GAME_MODE[keyof typeof GAME_MODE];

const MOVE_DIR = {
  up: 0,
  down: 1,
} as const;
export type MOVE_DIR = typeof MOVE_DIR[keyof typeof MOVE_DIR];

export class GameLadderDto {
  constructor(rank: Rank) {
    this.rank = rank.rank;
    this.winCount = rank.win;
    this.loseCount = rank.lose;
  }
  @ApiProperty({ example: 1 })
  rank: number;

  @ApiProperty({ example: 3 })
  winCount: number;

  @ApiProperty({ example: 2 })
  loseCount: number;
}

export class GameRecordDto {
  constructor(game: Game) {
    const { id, win, ladder, opponent } = game;
    this.id = id;
    this.opponent = new UserDto(opponent.id, opponent.nickname, opponent.image);
    this.isWin = win;
    this.isLadder = ladder;
  }
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
  title: string;

  userId: number;

  mode: GAME_MODE;
}

export class WatchDto {
  userId: number;
}

export class MatchInfo {
  constructor(socket: Socket, userId: number, mode: GAME_MODE) {
    this.socket = socket;
    this.userId = userId;
    this.mode = mode;
  }
  socket: Socket;

  userId: number;

  mode: GAME_MODE;
}

export class HandleStartDto {
  title: string;
  userId: number;
}

export class SizeDto {
  size: number;
  title: string;
}

export class GameInfoDto {
  ballPos: { x: number; y: number };
  paddlePos: { left: number; right: number };
  size: number;
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

export class AddGameResultDto {
  players: { left: User; right: User };
  score: { left: number; right: number };
  mode: GAME_MODE;
}

export class GameInfo {
  constructor(
    private player1: User,
    private player2: User,
    public mode: GAME_MODE,
  ) {
    this.player = { left: player1, right: player2 };
    this.score = { left: 0, right: 0 };
    this.ballPos = { x: 512, y: 310 };
    this.ballSpeed = { x: 20, y: -20 };
    this.paddlePos = { left: (620 - 186) / 2, right: 0 };
    this.mode = mode;
    this.size = 1;
  }

  player: { left: User; right: User };
  score: { left: number; right: number };
  ballPos: { x: number; y: number };
  ballSpeed: { x: number; y: number };
  paddlePos: { left: number; right: number };
  size: number;

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
      ballPos: {
        x: this.ballPos.x * this.size,
        y: this.ballPos.y * this.size,
      },
      paddlePos: {
        left: this.paddlePos.left * this.size,
        right: this.paddlePos.right * this.size,
      },
      size: this.size,
    };
  }

  public getGameScoreDto(): GameScoreDto {
    return {
      score: this.score,
    };
  }
}
