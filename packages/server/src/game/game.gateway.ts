import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import {
  HandleStartDto,
  MatchDto,
  MovePaddleDto,
  SizeDto,
  WatchDto,
} from './game.dto';
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

  // TODO: 상대 유저가 disconnect 되었을 때 패배 처리
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
  async handleStart(client: Socket, handleStartDto: HandleStartDto) {
    await this.gameService.handleStart(client, handleStartDto);
  }

  @SubscribeMessage('movePaddle')
  async handleMovePaddle(client: Socket, movePaddleDto: MovePaddleDto) {
    await this.gameService.handleMovePaddle(client, movePaddleDto);
  }

  @SubscribeMessage('resizeWindow')
  handleGameSize(client: Socket, sizeDto: SizeDto) {
    this.gameService.handleGameSize(client, sizeDto);
  }

  @SubscribeMessage('watch')
  async handleWatch(client: Socket, watchDto: WatchDto) {
    return await this.gameService.handleWatch(client, watchDto);
  }
}
