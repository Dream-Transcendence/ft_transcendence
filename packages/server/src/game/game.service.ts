import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Socket } from 'socket.io';
import { Game } from './game.dto';

@Injectable()
export class GameService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  games = new Map<string, Game>();
  ballRadius = 10;
  canvasWidth = 480;
  canvasHeight = 250;
  paddleWidth = 10;
  paddleHeight = 75;

  emitToEveryone(client: Socket, title: string, data: any) {
    client.to(title).emit('gameMessage', data);
    client.emit('gameMessage', data);
  }

  // requestGame, acceptGame은 user 파트에서 구현
  // 구현 전 postman에서 프론트에서 받는 결과를 보기 위한 함수
  createGame(client: Socket, body: any) {
    const { title } = body;
    client.join(title);
    this.emitToEveryone(
      client,
      title,
      `${client.id}가 게임 방에 참여하였습니다`,
    );
  }

  gameStart(client: Socket, body: any) {
    const { title } = body;
    if (!this.games.has(title)) {
      this.games.set(title, {
        x: 240,
        y: 125,
        dx: 3,
        dy: -3,
        leftPaddleY: (250 - 75) / 2,
        // rightPaddleY: (250 - 75) / 2,
        rightPaddleY: 0,
        leftScore: 0,
        rightScore: 0,
      });
    }
    this.addInterval(title, 100, client);
  }

  addInterval(title: string, milliseconds: number, client: Socket) {
    const callback = () => {
      const x = this.games.get(title).x;
      const y = this.games.get(title).y;
      const dx = this.games.get(title).dx;
      const dy = this.games.get(title).dy;
      const leftPaddleY = this.games.get(title).leftPaddleY;
      const rightPaddleY = this.games.get(title).rightPaddleY;

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
          this.games.get(title).dx *= -1;
          this.emitToEveryone(
            client,
            title,
            '@@@@@@@@@@@@ 패들에 부딫힘 @@@@@@@@@@@@@@',
          );
        } else {
          let message = '#############게임중################';
          this.games.get(title).x = 240;
          this.games.get(title).y = 125;
          this.games.get(title).dy = -3;
          this.games.get(title).dx = 3;
          if (x + dx < this.ballRadius) this.games.get(title).rightScore += 1;
          else if (x + dx > this.canvasWidth - this.ballRadius)
            this.games.get(title).leftScore += 1;
          if (
            this.games.get(title).rightScore === 3 ||
            this.games.get(title).leftScore === 3
          ) {
            // 승패 결정
            // db에 저장, user 정보도 emit
            message = '#############게임 끝################';
            // this.emitToEveryone(client, title, {
            //   leftScore: this.games.get(title).leftScore,
            //   rightScore: this.games.get(title).rightScore,
            //   message,
            // });
            // this.schedulerRegistry.deleteInterval(title);
            // // 방 없애기
            // return;
          }
          this.emitToEveryone(client, title, {
            leftScore: this.games.get(title).leftScore,
            rightScore: this.games.get(title).rightScore,
            message,
          });
          // interval을 없애고 프론트에서 gamestart를 emit하면 다시 interval만들기
          this.schedulerRegistry.deleteInterval(title);
          return;
        }
      }
      if (
        y + dy > this.canvasHeight - this.ballRadius ||
        y + dy < this.ballRadius
      ) {
        this.games.get(title).dy *= -1;
        this.emitToEveryone(client, title, '위, 아래에서 부딫힘');
      }
      this.games.get(title).x += this.games.get(title).dx;
      this.games.get(title).y += this.games.get(title).dy;
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

  changePaddle(client: Socket, body: any) {
    const { title, paddleDirection, paddleLocation } = body;
    if (paddleLocation === 'left' && paddleDirection === 'up')
      this.games.get(title).leftPaddleY -= 5;
    else if (paddleLocation === 'left' && paddleDirection === 'down')
      this.games.get(title).leftPaddleY += 5;
    else if (paddleLocation === 'right' && paddleDirection === 'up')
      this.games.get(title).rightPaddleY -= 5;
    else this.games.get(title).rightPaddleY += 5;
  }

  // 관전자
}
