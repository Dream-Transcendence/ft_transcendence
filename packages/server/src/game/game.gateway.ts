import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MatchDto, MovePaddleDto, RoomTitleDto } from './game.dto';
import { GameService } from './game.service';

@WebSocketGateway(4242, {
  namespace: 'game',
  cors: true,
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private gameService: GameService) {}
  @WebSocketServer()
  server: Server;

  handleConnection() {
    console.log('Game Client connected');
  }

  handleDisconnect() {
    console.log('Game Client disconnected');
  }

  @SubscribeMessage('match')
  async handleMatch(client: Socket, matchDto: MatchDto) {
    return await this.gameService.handleMatch(client, matchDto);
  }

  @SubscribeMessage('cancelMatch')
  async handleCancel(client: Socket, matchDto: MatchDto) {
    await this.gameService.handleCancelMatch(client, matchDto);
  }

  @SubscribeMessage('start')
  async handleStart(client: Socket, roomTitleDto: RoomTitleDto) {
    await this.gameService.handleStart(client, roomTitleDto);
  }

  @SubscribeMessage('movePaddle')
  async handleMovePaddle(client: Socket, movePaddleDto: MovePaddleDto) {
    await this.gameService.handleMovePaddle(client, movePaddleDto);
  }
}
