import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { v4 as uuidv4 } from 'uuid';
import { Socket, Server } from 'socket.io';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { GameRoomDto, MatchDto } from './game.dto';

class MatchingInfo {
  constructor(public readonly userId: number, public readonly socket: Socket) {}
}

@WebSocketGateway(4242, {
  namespace: 'game',
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @Inject('USERS_REPOSITORY') private userRepository: Repository<User>,
  ) {}
  @WebSocketServer()
  server: Server;

  private matchingQueue: MatchingInfo[][] = [];

  handleConnection() {
    console.log('Game Client connected');
  }

  handleDisconnect() {
    console.log('Game Client disconnected');
  }

  @SubscribeMessage('match')
  async handleMatch(client: Socket, matchDto: MatchDto) {
    console.log('Game Client match', matchDto);
    // NOTE: 유저가 매칭을 요청하면, 매칭 대기열에 추가
    if (this.matchingQueue.length === 0) {
      this.matchingQueue[matchDto.mode].push(
        new MatchingInfo(matchDto.userId, client),
      );
    } else {
      this.matchingQueue.map((eachQueue) => {
        eachQueue.map((matchingInfo) => {
          if (matchingInfo.userId === matchDto.userId)
            throw new WsException('이미 매칭 대기열에 있습니다.');
        });
      });

      // NOTE: 매칭 대기열에 유저가 있으면, 매칭(로직이 문제 없는 지 고민해봐야 함)
      const opponent = this.matchingQueue[matchDto.mode].shift();
      const player1 = await this.userRepository.findOneBy({
        id: matchDto.userId,
      });
      const player2 = await this.userRepository.findOneBy({
        id: opponent.userId,
      });
      const gameRoomDto: GameRoomDto = {
        id: uuidv4(),
        leftPlayer: {
          id: player1.id,
          nickname: player1.nickname,
          image: player1.image,
        },
        rightPlayer: {
          id: player2.id,
          nickname: player2.nickname,
          image: player2.image,
        },
        mode: matchDto.mode,
      };
      client.join(gameRoomDto.id);
      opponent.socket.join(gameRoomDto.id);

      this.server.to(gameRoomDto.id).emit('matched', gameRoomDto);
    }
  }

  @SubscribeMessage('cancel')
  async handleCancel(client: Socket, matchDto: MatchDto) {
    console.log('Game Client cancel', matchDto);

    const index = this.matchingQueue[matchDto.mode].findIndex(
      (matchingInfo) => matchingInfo.socket.id === client.id,
    );
    // NOTE: 리스트에서 해당 유저를 삭제하기만 하면 되는데, 응답을 보내야할까?
    this.matchingQueue[matchDto.mode].splice(index, 1);
    client.disconnect();
  }
}
