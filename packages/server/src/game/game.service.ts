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

  ballRadius = 10;
  canvasWidth = 480;
  canvasHeight = 250;
  paddleWidth = 10;
  paddleHeight = 75;

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
    const gameInfo = new GameInfo(player1, player2, opponent.mode);

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

    if (matchDto.mode === 0)
      this.userGateway.setConnection(matchDto.userId, true);

    // NOTE: 래더가 아닐 때, 매치(타임 아웃을 걸어야할 지 고민)
    if (matchDto.mode !== 0) {
      console.log("matchDto.mode !== 0@@@@@@@@@@@");
      if (this.customMatchingMap.has(title)) {
        const opponent = this.customMatchingMap.get(title);
        this.customMatchingMap.delete(title);
        this.match(client, title, userId, opponent);
      } else {
        this.customMatchingMap.set(title, new MatchInfo(client, userId, mode));
      }
    } else {
      console.log("matchDto.mode === 0@@@@@@@@@@@");
      // NOTE: 매칭 대기열에 동일 유저가 있으면, WsException 발생
      if (this.matchingQueue.length !== 0) {
        // NOTE: 매칭 대기열에 유저가 있으면, 매칭(로직이 문제 없는 지 고민해봐야 함)
        const opponent = this.matchingQueue.shift();
        console.log("듀명@@@@@@@@@@@@@@@@@@@@@@@");
        this.match(client, uuidv4(), userId, opponent);
      } else {
        this.matchingQueue.push(new MatchInfo(client, matchDto.userId, 0));
        console.log("한명@@@@@@@@@@@@@@@@@@@@@@@");
      }
    }
    return {isMatched: true};
  }

  async handleCancelMatch(client: Socket, matchDto: MatchDto) {
    console.log('Game Client cancel', matchDto);

    this.userGateway.setConnection(matchDto.userId, false);

    const index = this.matchingQueue.findIndex(
      (matchingInfo) => matchingInfo.socket.id === client.id,
    );
    // NOTE: 리스트에서 해당 유저를 삭제하기만 하면 되는데, 응답을 보내야할까?
    this.matchingQueue.splice(index, 1);
    client.disconnect();
    return { isCanceled: true };
    // NOTE disconnect를 할지 방에서만 빼낼지 고민
  }

  async addGameResult(addGameResultDto: AddGameResultDto) {
    const { players, score, mode } = addGameResultDto;
    const result1 = this.gamesRepository.create({
      win: score.left > score.right ? true : false,
      ladder: mode === 0 ? true : false,
      user: players.left,
      opponent: players.right,
    });
    console.log('result1: ', result1);
    const result2 = this.gamesRepository.create({
      win: score.left < score.right ? true : false,
      ladder: mode === 0 ? true : false,
      user: players.right,
      opponent: players.left,
    });
    console.log('result2 ', result2);
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
        this.gameInfoMap.get(title).player.left,
        this.gameInfoMap.get(title).player.right,
      ].sort();
      if (JSON.stringify(arr1) !== JSON.stringify(arr2))
        throw new WsException('There is an incorrect user in the game room.');
    }
    await this.addInterval(title, 1000 / 6, client);
  }

  initializeVariables(title: string) {
    const size = this.gameInfoMap.get(title).size;
    const x = this.gameInfoMap.get(title).ballPos.x * size;
    const y = this.gameInfoMap.get(title).ballPos.y * size;
    const dx = this.gameInfoMap.get(title).ballSpeed.x * size;
    const dy = this.gameInfoMap.get(title).ballSpeed.y * size;
    const leftPaddleY = this.gameInfoMap.get(title).paddlePos.left * size;
    const rightPaddleY = this.gameInfoMap.get(title).paddlePos.right * size;
    const canvasWidth = this.canvasWidth * size;
    const canvasHeight = this.canvasHeight * size;
    const ballRadius = this.ballRadius * size;
    const paddleHeight = this.paddleHeight * size;

    return {
      x,
      y,
      dx,
      dy,
      leftPaddleY,
      rightPaddleY,
      canvasWidth,
      canvasHeight,
      ballRadius,
      paddleHeight,
    };
  }

  async addInterval(title: string, milliseconds: number, client: Socket) {
    // 여기서 mode에 대한 변경도 바꿔주기
    if (this.gameInfoMap.get(title).mode == 2) {
      this.gameInfoMap.get(title).ballSpeed.x *= 2;
      this.gameInfoMap.get(title).ballSpeed.y *= 2;
    }
    if (this.gameInfoMap.get(title).mode == 3) this.ballRadius /= 2;
    const callback = async () => {
      if (!this.gameInfoMap.get(title))
        throw new NotFoundException('게임이 존재하지 않습니다');

      const {
        x,
        y,
        dx,
        dy,
        leftPaddleY,
        rightPaddleY,
        canvasHeight,
        canvasWidth,
        ballRadius,
        paddleHeight,
      } = this.initializeVariables(title);

      if (x + dx > canvasWidth - ballRadius || x + dx < ballRadius) {
        if (
          (y > leftPaddleY &&
            y < leftPaddleY + paddleHeight &&
            x + dx < ballRadius) ||
          (y > rightPaddleY &&
            y < rightPaddleY + paddleHeight &&
            x + dx > canvasWidth - ballRadius)
        ) {
          this.gameInfoMap.get(title).ballSpeed.x *= -1;
          this.emitToEveryone(
            client,
            title,
            'gameMessage',
            '@@@@@@@@@@@@ 패들에 부딫힘 @@@@@@@@@@@@@@',
          );
        } else {
          this.gameInfoMap.get(title).ballPos.x = 240;
          this.gameInfoMap.get(title).ballPos.y = 125;
          this.gameInfoMap.get(title).ballSpeed.y = -4;
          this.gameInfoMap.get(title).ballSpeed.x = 4;
          this.gameInfoMap.get(title).paddlePos.left = (250 - 75) / 2;
          this.gameInfoMap.get(title).paddlePos.right = 0;

          if (x + dx < this.ballRadius)
            this.gameInfoMap.get(title).score.right += 1;
          else this.gameInfoMap.get(title).score.left += 1;
          if (
            this.gameInfoMap.get(title).score.right === 3 ||
            this.gameInfoMap.get(title).score.left === 3
          ) {
            const players = this.gameInfoMap.get(title).player;
            // NOTE: 게임 중 상태를 온라인으로 바꿈
            this.userGateway.setConnection(players.left.id, false);
            this.userGateway.setConnection(players.right.id, false);
            const gameResult: AddGameResultDto = {
              players,
              score: this.gameInfoMap.get(title).score,
              mode: this.gameInfoMap.get(title).mode,
            };
            await this.addGameResult(gameResult);
            if (gameResult.mode === 0) await this.updateRank(gameResult);
            this.gameInfoMap.delete(title);
          }
          this.emitToEveryone(
            client,
            title,
            'gameEnd',
            this.gameInfoMap.get(title).getGameScoreDto(),
          );
          this.schedulerRegistry.deleteInterval(title);
          return;
        }
      }
      if (y + dy > canvasHeight - ballRadius || y + dy < ballRadius) {
        this.gameInfoMap.get(title).ballSpeed.y *= -1;
        this.emitToEveryone(
          client,
          title,
          'gameMessage',
          `위, 아래에서 부딫힘 ${ballRadius}`,
        );
      }
      this.gameInfoMap.get(title).ballPos.x +=
        this.gameInfoMap.get(title).ballSpeed.x;
      this.gameInfoMap.get(title).ballPos.y +=
        this.gameInfoMap.get(title).ballSpeed.y;
      this.emitToEveryone(
        client,
        title,
        'gameProcess',
        this.gameInfoMap.get(title).getGameInfoDto(this.ballRadius),
      );
    };

    const interval = setInterval(callback, milliseconds);
    this.schedulerRegistry.addInterval(title, interval);
  }

  async handleMovePaddle(client: Socket, movePaddleDto: MovePaddleDto) {
    const { title, playerId, moveDir } = movePaddleDto;
    let movement;
    if (this.gameInfoMap.get(title).size === 0.5) movement = 4;
    else movement = 8;
    if (moveDir) movement = -movement;

    if (playerId === this.gameInfoMap.get(title).player.left.id) {
      this.gameInfoMap.get(title).paddlePos.left += movement;
    } else {
      this.gameInfoMap.get(title).paddlePos.right += movement;
    }
  }

  handleGameSize(client: Socket, sizeDto: SizeDto) {
    this.gameInfoMap.get(sizeDto.title).size = sizeDto.size;
  }
}
