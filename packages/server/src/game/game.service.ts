import { Inject, Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Socket } from 'socket.io';
import {
  GameInfo,
  MatchDto,
  RoomTitleDto,
  MovePaddleDto,
  MatchInfo,
  AddGameResultDto,
} from './game.dto';
import { Game, User } from '../users/users.entity';
import { Repository } from 'typeorm';
import { WsException } from '@nestjs/websockets';
import { v4 as uuidv4 } from 'uuid';
import { UserGateway } from 'src/users/user.gateway';
import { UserService } from 'src/users/users.service';

@Injectable()
export class GameService {
  constructor(
    @Inject('USERS_REPOSITORY') private userRepository: Repository<User>,
    @Inject('GAMES_REPOSITORY') private gamesRepository: Repository<Game>,
    private schedulerRegistry: SchedulerRegistry,
    private userService: UserService,
    private userGateway: UserGateway,
  ) {}
  private matchingQueue: MatchInfo[] = [];
  private gameInfoMap: Map<string, GameInfo> = new Map();
  private customMatchingMap: Map<string, MatchInfo> = new Map();

  ballRadius = 10;
  canvasWidth = 480;
  canvasHeight = 250;
  paddleWidth = 10;
  paddleHeight = 75;

  emitToEveryone(client: Socket, title: string, data: any) {
    client.to(title).emit('gameMessage', data);
    client.emit('gameMessage', data);
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
    this.emitToEveryone(client, title, gameInfo.getGameRoomDto(title));
  }

  // 매칭에는 게임설정이 없다
  async handleMatch(client: Socket, matchDto: MatchDto) {
    if (matchDto.mode === 0)
      this.userGateway.setConnection(matchDto.userId, true);

    const { title, userId, mode } = matchDto;
    console.log('Game Client match', matchDto);
    // NOTE: 유저가 매칭을 요청하면, 매칭 대기열에 추가

    for (const [key, value] of this.customMatchingMap) {
      if (value.userId === userId)
        throw new WsException('이미 매칭 대기열에 있습니다.');
    }
    this.matchingQueue.map((matchingInfo) => {
      if (matchingInfo.userId === userId)
        throw new WsException('이미 매칭 대기열에 있습니다.');
    });
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
  }

  async handleCancelMatch(client: Socket, matchDto: MatchDto) {
    console.log('Game Client cancel', matchDto);

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
    const result2 = await this.gamesRepository.create({
      win: score.left < score.right ? true : false,
      ladder: mode === 0 ? true : false,
      user: players.right,
      opponent: players.left,
    });
    console.log('result2 ', result2);
    await this.gamesRepository.save([result1, result2]);
  }

  async handleStart(client: Socket, roomTitleDto: RoomTitleDto) {
    const { title } = roomTitleDto;
    await this.addInterval(title, 1000 / 6, client);
  }

  async addInterval(title: string, milliseconds: number, client: Socket) {
    const callback = () => {
      const x = this.gameInfoMap.get(title).ballPos.x;
      const y = this.gameInfoMap.get(title).ballPos.y;
      const dx = this.gameInfoMap.get(title).ballSpeed.x;
      const dy = this.gameInfoMap.get(title).ballSpeed.y;
      const leftPaddleY = this.gameInfoMap.get(title).paddlePos.left;
      const rightPaddleY = this.gameInfoMap.get(title).paddlePos.right;

      if (
        x + dx > this.canvasWidth - this.ballRadius ||
        x + dx < this.ballRadius
      ) {
        if (
          (y > leftPaddleY &&
            y < leftPaddleY + this.paddleHeight &&
            x + dx < this.ballRadius) ||
          (y > rightPaddleY &&
            y < rightPaddleY + this.paddleHeight &&
            x + dx > this.canvasWidth - this.ballRadius)
        ) {
          this.gameInfoMap.get(title).ballSpeed.x *= -1;
          this.emitToEveryone(
            client,
            title,
            '@@@@@@@@@@@@ 패들에 부딫힘 @@@@@@@@@@@@@@',
          );
        } else {
          let message = '#############게임중################';
          this.gameInfoMap.get(title).ballPos.x = 240;
          this.gameInfoMap.get(title).ballPos.y = 125;
          this.gameInfoMap.get(title).ballSpeed.y = -3;
          this.gameInfoMap.get(title).ballSpeed.x = 3;
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
            // 여기 추가
            this.addGameResult({
              players,
              score: this.gameInfoMap.get(title).score,
              mode: 0,
            });
            message = '#############게임 끝################';
          }
          this.emitToEveryone(
            client,
            title,
            this.gameInfoMap.get(title).getGameScoreDto(),
          );
          this.schedulerRegistry.deleteInterval(title);
          return;
        }
      }
      if (
        y + dy > this.canvasHeight - this.ballRadius ||
        y + dy < this.ballRadius
      ) {
        this.gameInfoMap.get(title).ballSpeed.y *= -1;
        this.emitToEveryone(client, title, '위, 아래에서 부딫힘');
      }
      this.gameInfoMap.get(title).ballPos.x +=
        this.gameInfoMap.get(title).ballSpeed.x;
      this.gameInfoMap.get(title).ballPos.y +=
        this.gameInfoMap.get(title).ballSpeed.y;
      this.emitToEveryone(
        client,
        title,
        this.gameInfoMap.get(title).getGameInfoDto(),
      );
    };

    const interval = setInterval(callback, milliseconds);
    this.schedulerRegistry.addInterval(title, interval);
  }

  async handleMovePaddle(client: Socket, movePaddleDto: MovePaddleDto) {
    const { title, playerId, moveDir } = movePaddleDto;

    let movement = 7;
    if (moveDir) movement = -movement;

    if (playerId === this.gameInfoMap.get(title).player.left.id) {
      this.gameInfoMap.get(title).paddlePos.left += movement;
    } else {
      this.gameInfoMap.get(title).paddlePos.right += movement;
    }
  }
}
