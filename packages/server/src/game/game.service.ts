import { Inject, Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Socket } from 'socket.io';
import {
  GameInfo,
  MatchDto,
  MatchingInfo,
  RoomTitleDto,
  MovePaddleDto,
} from './game.dto';
import { User } from '../users/users.entity';
import { Repository } from 'typeorm';
import { WsException } from '@nestjs/websockets';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GameService {
  constructor(
    @Inject('USERS_REPOSITORY') private userRepository: Repository<User>,
    private schedulerRegistry: SchedulerRegistry,
  ) {}
  private matchingQueue: MatchingInfo[][] = Array.from(Array(4), () => []);
  private gameInfoMap: Map<string, GameInfo> = new Map();

  ballRadius = 10;
  canvasWidth = 480;
  canvasHeight = 250;
  paddleWidth = 10;
  paddleHeight = 75;

  emitToEveryone(client: Socket, title: string, data: any) {
    client.to(title).emit('gameMessage', data);
    client.emit('gameMessage', data);
  }

  async handleMatch(client: Socket, matchDto: MatchDto) {
    console.log('Game Client match', matchDto);
    // NOTE: 유저가 매칭을 요청하면, 매칭 대기열에 추가

    // NOTE: 매칭 대기열에 동일 유저가 있으면, WsException 발생
    this.matchingQueue.map((eachQueue) => {
      eachQueue.map((matchingInfo) => {
        if (matchingInfo.userId === matchDto.userId)
          throw new WsException('이미 매칭 대기열에 있습니다.');
      });
    });
    if (this.matchingQueue[matchDto.mode].length === 0) {
      this.matchingQueue[matchDto.mode].push(
        new MatchingInfo(matchDto.userId, client),
      );
    } else {
      // NOTE: 매칭 대기열에 유저가 있으면, 매칭(로직이 문제 없는 지 고민해봐야 함)
      const opponent = this.matchingQueue[matchDto.mode].shift();
      const player1 = await this.userRepository.findOneBy({
        id: matchDto.userId,
      });
      const player2 = await this.userRepository.findOneBy({
        id: opponent.userId,
      });
      const gameInfo = new GameInfo(player1, player2);

      // 나중에 모드 나누기
      const title = uuidv4();
      client.join(title);
      opponent.socket.join(title);

      this.gameInfoMap.set(title, gameInfo); // this.server
      //   .to(gameInfo.title)
      //   .emit('matched', gameInfo.getGameRoomDto());
      this.emitToEveryone(client, title, gameInfo.getGameRoomDto(title));
      // emit event gameMessage로 통일
    }
  }

  async handleCancel(client: Socket, matchDto: MatchDto) {
    console.log('Game Client cancel', matchDto);
    const index = this.matchingQueue[matchDto.mode].findIndex(
      (matchingInfo) => matchingInfo.socket.id === client.id,
    );
    // NOTE: 리스트에서 해당 유저를 삭제하기만 하면 되는데, 응답을 보내야할까?
    this.matchingQueue[matchDto.mode].splice(index, 1);
    client.disconnect();
  }

  async handleStart(client: Socket, roomTitleDto: RoomTitleDto) {
    const { title } = roomTitleDto;
    await this.addInterval(title, 1000 / 6, client);
  }

  addInterval(title: string, milliseconds: number, client: Socket) {
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
          this.gameInfoMap.get(title).paddlePos.right = (250 - 75) / 2;

          if (x + dx < this.ballRadius)
            this.gameInfoMap.get(title).score.right += 1;
          else this.gameInfoMap.get(title).score.left += 1;
          if (
            this.gameInfoMap.get(title).score.right === 3 ||
            this.gameInfoMap.get(title).score.left === 3
          ) {
            message = '#############게임 끝################';
          }
          this.emitToEveryone(client, title, {
            leftScore: this.gameInfoMap.get(title).score.left,
            rightScore: this.gameInfoMap.get(title).score.right,
            message,
          });
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
      this.emitToEveryone(client, title, {
        title: title,
        x: x,
        y: y,
        leftPaddleY: leftPaddleY,
        rightPaddleY: rightPaddleY,
      });
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
