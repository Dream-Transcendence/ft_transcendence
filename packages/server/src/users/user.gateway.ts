import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConnectionDto } from './dto/connect-user.dto';
import {
  CancelInviteDto,
  ClientAcceptGameDto,
  ClientInviteGameDto,
  ClientRequestDto,
  RequestIdDto,
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

  async setConnection(userId: number, onGame: boolean) {
    console.log('????????');
    const result = this.userService.setConnection(userId, onGame);
    if (result === null) return null;
    this.server.emit('changeUserStatus', result);
  }

  async handleConnection(client: Socket) {
    console.log('User Client connected', client.id);
  }

  async handleDisconnect(client: Socket) {
    console.log('User Client disconnected@@@@@@@@@@@@@@@@@');
    this.userService.handleDisconnect(client);
  }

  @SubscribeMessage('logOn')
  async handleLogOn(client: Socket, connectionDto: ConnectionDto) {
    return await this.userService.handleLogOn(client, connectionDto);
  }

  @SubscribeMessage('inviteGame')
  async handleInviteGame(client: Socket, inviteGameDto: ClientInviteGameDto) {
    await this.userService.handleInviteGame(client, inviteGameDto);
  }

  @SubscribeMessage('cancelInvite')
  async handleCancelInvite(client: Socket, cancelInviteDto: CancelInviteDto) {
    return await this.userService.handleCancelInvite(client, cancelInviteDto);
  }

  @SubscribeMessage('acceptGame')
  async handleAcceptGame(client: Socket, acceptGameDto: ClientAcceptGameDto) {
    await this.userService.handleAcceptGame(client, this.server, acceptGameDto);
  }

  @SubscribeMessage('rejectGame')
  async handleRejectGame(client: Socket, userIdDto: UserIdDto) {
    this.userService.handleRejectGame(client, this.server, userIdDto);
  }

  @SubscribeMessage('friendRequest')
  async handleFriendRequest(
    client: Socket,
    clientRequestDto: ClientRequestDto,
  ) {
    return await this.userService.handleFriendRequest(client, clientRequestDto);
  }

  @SubscribeMessage('acceptFriendRequest')
  async handleAcceptFriendRequest(client: Socket, requestIdDto: RequestIdDto) {
    return await this.userService.handleAcceptFriendRequest(
      client,
      requestIdDto,
    );
  }

  @SubscribeMessage('rejectFriendRequest')
  async handleRejectFriendRequest(client: Socket, requestIdDto: RequestIdDto) {
    await this.userService.handleRejectFriendRequest(client, requestIdDto);
  }
}
