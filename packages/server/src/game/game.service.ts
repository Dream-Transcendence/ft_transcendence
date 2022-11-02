import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Socket } from 'socket.io';
import {
  GameInfo,
  MatchDto,
  MovePaddleDto,
  MatchInfo,
  AddGameResultDto,
  SizeDto,
  HandleStartDto,
  GameScoreDto,
  WatchDto,
  GameUserDto,
} from './game.dto';
import { Game, Rank, User } from '../users/users.entity';
import { Repository } from 'typeorm';
import { WsException } from '@nestjs/websockets';
import { v4 as uuidv4 } from 'uuid';
import { UserGateway } from 'src/users/user.gateway';

@Injectable()
export class GameService {
  constructor(
    @Inject('USERS_REPOSITORY') private userRepository: Repository<User>,
    @Inject('GAMES_REPOSITORY') private gamesRepository: Repository<Game>,
    @Inject('RANK_REPOSITORY') private rankRepository: Repository<Rank>,
    private schedulerRegistry: SchedulerRegistry,
    private userGateway: UserGateway,
  ) {}
  private matchingQueue: MatchInfo[] = [];
  private readyMap: Map<string, number> = new Map();
  private gameInfoMap: Map<string, GameInfo> = new Map();
  private customMatchingMap: Map<string, MatchInfo> = new Map();

  ballDiameter = 40;
  canvasWidth = 1024;
  canvasHeight = 620;
  paddleWidth = 20;
  paddleHeight = 186;

  async handleDisconnect(client: Socket) {
    for (const [key, value] of this.gameInfoMap) {
      if (
        value.player.left.clientId === client.id ||
        value.player.right.clientId === client.id
      ) {
        let player;
        if (this.gameInfoMap.get(key).player.left.clientId === client.id) {
          this.gameInfoMap.get(key).score.right = 3;
          player = this.gameInfoMap.get(key).player.left;
        } else {
          this.gameInfoMap.get(key).score.left = 3;
          player = this.gameInfoMap.get(key).player.right;
        }
        const gameResult: AddGameResultDto = {
          players: this.gameInfoMap.get(key).player,
          score: this.gameInfoMap.get(key).score,
          mode: this.gameInfoMap.get(key).mode,
        };
        await this.addGameResult(gameResult);
        if (gameResult.mode === 0) await this.updateRank(gameResult);
        client
          .to(key)
          .emit(
            'playerAbstention',
            this.gameInfoMap.get(key).getAbstentionDto(player.id),
          );
        client.leave(key);
        this.gameInfoMap.delete(key);
        this.schedulerRegistry.deleteInterval(key);
      }
    }
  }

  emitToEveryone(client: Socket, title: string, event: string, data: any) {
    client.to(title).emit(event, data);
    client.emit(event, data);
  }

  async match(
    client: Socket,
    title: string,
    userId: number,
    opponent: MatchInfo,
  ) {
    const player1 = await this.userRepository.findOneBy({
      id: userId,
    });
    const player2 = await this.userRepository.findOneBy({
      id: opponent.userId,
    });
    const gameInfo = new GameInfo(
      new GameUserDto(player1, client.id),
      new GameUserDto(player2, opponent.socket.id),
      opponent.mode,
    );

    client.join(title);
    opponent.socket.join(title);

    this.gameInfoMap.set(title, gameInfo);
    this.emitToEveryone(
      client,
      title,
      'alreadyForMatch',
      gameInfo.getGameRoomDto(title),
    );
  }

  // 매칭에는 게임설정이 없다
  async handleMatch(client: Socket, matchDto: MatchDto) {
    const { title, userId, mode } = matchDto;
    console.log('Game Client match', matchDto);

    for (const [key, value] of this.customMatchingMap) {
      if (value.userId === userId)
        throw new WsException('이미 매칭 대기열에 있습니다.');
    }
    this.matchingQueue.map((matchingInfo) => {
      if (matchingInfo.userId === userId)
        throw new WsException('이미 매칭 대기열에 있습니다.');
    });

    if (matchDto.mode === 0) {
      if (!(await this.userGateway.setConnection(matchDto.userId, true)))
        throw new WsException('로그인 되지 않은 유저입니다.');
    }

    // NOTE: 래더가 아닐 때, 매치(타임 아웃을 걸어야할 지 고민)
    if (matchDto.mode !== 0) {
      if (this.customMatchingMap.has(title)) {
        const opponent = this.customMatchingMap.get(title);
        this.customMatchingMap.delete(title);
        this.match(client, title, userId, opponent);
      } else {
        this.customMatchingMap.set(title, new MatchInfo(client, userId, mode));
      }
    } else {
      // NOTE: 매칭 대기열에 동일 유저가 있으면, WsException 발생
      if (this.matchingQueue.length !== 0) {
        // NOTE: 매칭 대기열에 유저가 있으면, 매칭(로직이 문제 없는 지 고민해봐야 함)
        const opponent = this.matchingQueue.shift();
        this.match(client, uuidv4(), userId, opponent);
      } else {
        this.matchingQueue.push(new MatchInfo(client, matchDto.userId, 0));
      }
    }
    return { isMatched: true };
  }

  async handleCancelMatch(client: Socket, matchDto: MatchDto) {
    console.log('Game Client cancel', matchDto);

    if (!(await this.userGateway.setConnection(matchDto.userId, false))) {
      throw new WsException('로그인 되지 않은 유저입니다.');
    }

    const index = this.matchingQueue.findIndex(
      (matchingInfo) => matchingInfo.socket.id === client.id,
    );
    // NOTE: 리스트에서 해당 유저를 삭제하기만 하면 되는데, 응답을 보내야할까?
    this.matchingQueue.splice(index, 1);
    return { isCanceled: true };
    // NOTE disconnect를 할지 방에서만 빼낼지 고민
  }

  async addGameResult(addGameResultDto: AddGameResultDto) {
    const { players, score, mode } = addGameResultDto;

    let id = 1;
    const game = await this.gamesRepository
      .createQueryBuilder('game')
      .select('MAX(game.id)', 'id')
      .getRawOne();
    if (game.id !== null) id = game.id + 1;

    const result1 = this.gamesRepository.create({
      id,
      win: score.left > score.right ? true : false,
      ladder: mode === 0 ? true : false,
      user: players.left,
      opponent: players.right,
    });
    const result2 = this.gamesRepository.create({
      id: id + 1,
      win: score.left < score.right ? true : false,
      ladder: mode === 0 ? true : false,
      user: players.right,
      opponent: players.left,
    });
    await this.gamesRepository.save([result1, result2]);
  }

  async updateRank(gameResult: AddGameResultDto) {
    const { players, score } = gameResult;

    const rank1 = await this.rankRepository.findOne({
      relations: ['user'],
      where: { user: { id: players.left.id } },
    });
    const rank2 = await this.rankRepository.findOne({
      relations: ['user'],
      where: { user: { id: players.right.id } },
    });

    if (score.left > score.right) {
      rank1.win++;
      rank2.lose++;
    } else {
      rank1.lose++;
      rank2.win++;
    }
    let tmp = Math.floor(rank1.win / 5);
    rank1.rank = tmp > 3 ? 3 : tmp;
    tmp = Math.floor(rank2.win / 5);
    rank2.rank = tmp > 3 ? 3 : tmp;

    await this.rankRepository.save([rank1, rank2]);
  }

  async handleStart(client: Socket, handleStartDto: HandleStartDto) {
    const { title, userId } = handleStartDto;
    if (!this.readyMap.get(title)) {
      this.readyMap.set(title, userId);
      return;
    } else {
      const arr1 = [userId, this.readyMap.get(title)].sort();

      const arr2 = [
        this.gameInfoMap.get(title).player.left.id,
        this.gameInfoMap.get(title).player.right.id,
      ].sort();
      if (JSON.stringify(arr1) !== JSON.stringify(arr2))
        throw new WsException('There is an incorrect user in the game room.');
    }
    await this.addInterval(title, 1000 / 6, client);
  }

  initializeVariables(title: string) {
    const x = this.gameInfoMap.get(title).ballPos.x;
    const y = this.gameInfoMap.get(title).ballPos.y;
    const leftPaddleY = this.gameInfoMap.get(title).paddlePos.left;
    const rightPaddleY = this.gameInfoMap.get(title).paddlePos.right;
    const canvasWidth = this.canvasWidth;
    const canvasHeight = this.canvasHeight;
    const ballDiameter = this.ballDiameter;
    const paddleHeight = this.paddleHeight;
    const paddleWidth = this.paddleWidth;

    return {
      x,
      y,
      leftPaddleY,
      rightPaddleY,
      canvasWidth,
      canvasHeight,
      ballDiameter,
      paddleHeight,
      paddleWidth,
    };
  }

  initializeDxy(title: string) {
    const {
      x,
      y,
      leftPaddleY,
      rightPaddleY,
      canvasHeight,
      canvasWidth,
      ballDiameter,
      paddleHeight,
      paddleWidth,
    } = this.initializeVariables(title);

    let dx = this.gameInfoMap.get(title).ballSpeed.x;
    let dy = this.gameInfoMap.get(title).ballSpeed.y;
    const sign = dy === dx ? 1 : -1;

    if (
      y > leftPaddleY - ballDiameter / 2 &&
      y < leftPaddleY + paddleHeight - ballDiameter / 2 &&
      x !== paddleWidth &&
      x + dx < paddleWidth
    ) {
      dx = paddleWidth - x;
      dy = sign * dx;
    } else if (
      y > rightPaddleY - ballDiameter / 2 &&
      y < rightPaddleY + paddleHeight - ballDiameter / 2 &&
      x !== canvasWidth - ballDiameter - paddleWidth &&
      x + dx > canvasWidth - ballDiameter - paddleWidth
    ) {
      dx = canvasWidth - ballDiameter - paddleWidth - x;
      dy = sign * dx;
    } else if (
      x !== canvasWidth - ballDiameter &&
      x + dx > canvasWidth - ballDiameter
    ) {
      dx = canvasWidth - ballDiameter - x;
      dy = sign * dx;
    } else if (x !== 0 && x + dx < 0) {
      dx = -x;
      dy = sign * dx;
    } else if (
      y !== canvasHeight - ballDiameter &&
      y + dy > canvasHeight - ballDiameter
    ) {
      dy = canvasHeight - ballDiameter - y;
      dx = sign * dy;
    } else if (y !== 0 && y + dy < 0) {
      dy = -y;
      dx = sign * dy;
    }

    return { dx, dy };
  }

  async addInterval(title: string, milliseconds: number, client: Socket) {
    if (this.gameInfoMap.get(title).mode == 2) {
      this.gameInfoMap.get(title).ballSpeed.x *= 2;
      this.gameInfoMap.get(title).ballSpeed.y *= 2;
    }
    if (this.gameInfoMap.get(title).mode == 3) this.ballDiameter /= 2;
    const callback = async () => {
      if (!this.gameInfoMap.get(title))
        throw new NotFoundException('게임이 존재하지 않습니다');

      const {
        x,
        y,
        leftPaddleY,
        rightPaddleY,
        canvasHeight,
        canvasWidth,
        ballDiameter,
        paddleHeight,
        paddleWidth,
      } = this.initializeVariables(title);
      const { dx, dy } = this.initializeDxy(title);

      let gameScoreDto: GameScoreDto = null;

      if (
        (y > leftPaddleY - ballDiameter / 2 &&
          y < leftPaddleY + paddleHeight - ballDiameter / 2 &&
          x + dx === paddleWidth) ||
        (y > rightPaddleY - ballDiameter / 2 &&
          y < rightPaddleY + paddleHeight - ballDiameter / 2 &&
          x + dx === canvasWidth - ballDiameter - paddleWidth)
      ) {
        this.gameInfoMap.get(title).ballSpeed.x *= -1;
      } else if (x === canvasWidth - ballDiameter || x === 0) {
        this.gameInfoMap.get(title).ballPos.x = 512;
        this.gameInfoMap.get(title).ballPos.y = 310;
        this.gameInfoMap.get(title).ballSpeed.y = -40;
        this.gameInfoMap.get(title).ballSpeed.x = 40;
        this.gameInfoMap.get(title).paddlePos.left = (620 - 186) / 2;
        this.gameInfoMap.get(title).paddlePos.right = 0;

        if (x === 0) this.gameInfoMap.get(title).score.right += 1;
        else if (x === canvasWidth - ballDiameter)
          this.gameInfoMap.get(title).score.left += 1;
        const players = this.gameInfoMap.get(title).getUserDto();
        if (
          this.gameInfoMap.get(title).score.right === 3 ||
          this.gameInfoMap.get(title).score.left === 3
        ) {
          const gameResult: AddGameResultDto = {
            players,
            score: this.gameInfoMap.get(title).score,
            mode: this.gameInfoMap.get(title).mode,
          };
          await this.addGameResult(gameResult);
          if (gameResult.mode === 0) await this.updateRank(gameResult);
          gameScoreDto = this.gameInfoMap.get(title).getGameScoreDto();
          this.gameInfoMap.delete(title);
        }
        if (this.gameInfoMap.get(title) !== undefined)
          gameScoreDto = this.gameInfoMap.get(title).getGameScoreDto();
        this.emitToEveryone(client, title, 'gameEnd', gameScoreDto);
        if (gameScoreDto.score.left === 3 || gameScoreDto.score.right === 3) {
          // NOTE: 게임 중 상태를 온라인으로 바꿈

          await this.userGateway.setConnection(players.left.id, false);
          await this.userGateway.setConnection(players.right.id, false);
        }
        this.schedulerRegistry.deleteInterval(title);
        return;
      }
      if (y + dy === canvasHeight - ballDiameter || y + dy === 0) {
        this.gameInfoMap.get(title).ballSpeed.y *= -1;
      }
      this.gameInfoMap.get(title).ballPos.x += dx;
      this.gameInfoMap.get(title).ballPos.y += dy;
      this.emitToEveryone(
        client,
        title,
        'gameProcess',
        this.gameInfoMap.get(title).getGameInfoDto(),
      );
    };

    const interval = setInterval(callback, milliseconds);
    this.schedulerRegistry.addInterval(title, interval);
  }

  async handleMovePaddle(client: Socket, movePaddleDto: MovePaddleDto) {
    const { title, playerId, moveDir } = movePaddleDto;
    const leftPaddleY = this.gameInfoMap.get(title).paddlePos.left;
    const rightPaddleY = this.gameInfoMap.get(title).paddlePos.right;
    const canvasHeight = this.canvasHeight;
    const paddleHeight = this.paddleHeight;

    let movement;
    if (this.gameInfoMap.get(title).size === 0.5) movement = 10;
    else movement = 20;
    if (!moveDir) movement = -movement;

    if (playerId === this.gameInfoMap.get(title).player.left.id) {
      if (0 > leftPaddleY + movement) {
        this.gameInfoMap.get(title).paddlePos.left = 0;
      } else if (leftPaddleY + movement > canvasHeight - paddleHeight) {
        this.gameInfoMap.get(title).paddlePos.left =
          canvasHeight - paddleHeight;
      } else {
        this.gameInfoMap.get(title).paddlePos.left += movement;
      }
    }
    if (playerId === this.gameInfoMap.get(title).player.right.id) {
      if (0 > rightPaddleY + movement) {
        this.gameInfoMap.get(title).paddlePos.right = 0;
      } else if (rightPaddleY + movement > canvasHeight - paddleHeight) {
        this.gameInfoMap.get(title).paddlePos.right =
          canvasHeight - paddleHeight;
      } else {
        this.gameInfoMap.get(title).paddlePos.right += movement;
      }
    }
  }

  handleGameSize(client: Socket, sizeDto: SizeDto) {
    this.gameInfoMap.get(sizeDto.title).size = sizeDto.size;
  }

  async handleWatch(client: Socket, watchDto: WatchDto) {
    const { userId } = watchDto;

    for (const [key, value] of this.gameInfoMap) {
      if (value.player.left.id === userId || value.player.right.id === userId) {
        client.join(key);
        const gameInfo = this.gameInfoMap.get(key);
        return gameInfo.getGameRoomDto(key);
      }
    }
    throw new WsException('게임이 존재하지 않습니다');
  }
}
