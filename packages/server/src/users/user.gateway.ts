import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConnectionDto } from './dto/connect-user.dto';
import {
  ClientAcceptGameDto,
  ClientInviteGameDto,
  UserIdDto,
} from './dto/user.dto';
import { UserService } from './users.service';

@WebSocketGateway(4242, {
  namespace: 'user',
})
export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
  // NOTE: 유저와 채팅 게이트웨이를 분리해야할까?(연결을 별도로 구성해야 하나?)
  constructor(private userService: UserService) {}

  @WebSocketServer()
  server: Server;

  setConnection(userId: number, onGame: boolean) {
    this.userService.setConnection(userId, this.server, onGame);
  }

  async handleConnection(client: Socket) {
    console.log('User Client connected', client.id);
  }

  async handleDisconnect(client: Socket) {
    this.userService.handleDisconnect(client);
  }

  @SubscribeMessage('logOn')
  async handleLogOn(client: Socket, connectionDto: ConnectionDto) {
    return await this.userService.handleLogOn(client, connectionDto);
  }

  @SubscribeMessage('inviteGame')
  async handleInviteGame(client: Socket, inviteGameDto: ClientInviteGameDto) {
    this.userService.handleInviteGame(client, inviteGameDto);
  }

  @SubscribeMessage('acceptGame')
  async handleAcceptGame(client: Socket, acceptGameDto: ClientAcceptGameDto) {
    this.userService.handleAcceptGame(client, this.server, acceptGameDto);
  }

  @SubscribeMessage('rejectGame')
  async handleRejectGame(client: Socket, userIdDto: UserIdDto) {
    this.userService.handleRejectGame(client, this.server, userIdDto);
  }

  @SubscribeMessage('friendRequest')
  async handleFriendRequest(client: Socket, userIdDto: UserIdDto) {
    // this.userService.handleFriendRequest(client, userIdDto);
  }

  @SubscribeMessage('acceptFriendRequest')
  async handleAcceptFriendRequest(client: Socket, userIdDto: UserIdDto) {}

  @SubscribeMessage('rejectFriendRequest')
  async handleRejectFriendRequest(client: Socket, userIdDto: UserIdDto) {}
}
