import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { GameService } from './game/game.service';

@WebSocketGateway(4242, { namespace: 'game', cors: true })
export class GameGateway {
  constructor(private readonly gameService: GameService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createGame')
  createGame(@ConnectedSocket() client: Socket, @MessageBody() body: any) {
    this.gameService.createGame(client, body);
  }

  @SubscribeMessage('gameStart')
  gameStart(@ConnectedSocket() client: Socket, @MessageBody() body: any) {
    this.gameService.gameStart(client, body);
  }

  @SubscribeMessage('paddleUp')
  changePaddle(@ConnectedSocket() client, @MessageBody() body: any) {
    this.gameService.changePaddle(client, body);
  }
}
