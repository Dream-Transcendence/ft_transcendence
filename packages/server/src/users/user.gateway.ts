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

  private connectionList = new Map<string, number>();

  async handleConnection(client: Socket) {
    console.log('User Client connected', client.id);
  }

  async handleDisconnect(client: Socket) {
    console.log('User Client disconnected', client.id);

    const userId = this.connectionList.get(client.id);
    const onlineUserList = Array.from(this.connectionList.values());

    const onlineFriendList = await this.userService.handleLogOn(
      userId,
      onlineUserList,
    );

    let count = 0;
    for (const value of onlineUserList) if (value === userId) count++;

    // NOTE: 2개 이상일 땐, 다른 클라이언트에서 로그인 되어있는 상태
    if (count === 1) {
      for (const [key, value] of this.connectionList) {
        if (onlineFriendList.connections.includes(value)) {
          this.server.to(key).emit('detectLogOff', { userId: userId });
        }
      }
    }

    this.connectionList.delete(client.id);
  }

  @SubscribeMessage('logOn')
  async handleLogOn(client: Socket, connectionDto: ConnectionDto) {
    const onlineUserList = Array.from(this.connectionList.values());

    this.connectionList.set(client.id, connectionDto.userId);

    const onlineFriendList = await this.userService.handleLogOn(
      connectionDto.userId,
      onlineUserList,
    );

    for (const [key, value] of this.connectionList) {
      if (onlineFriendList.connections.includes(value)) {
        this.server.to(key).emit('detectLogOn', connectionDto);
      }
    }

    return onlineFriendList;
  }

  @SubscribeMessage('inviteGame')
  async handleInviteGame(client: Socket, inviteGameDto: ClientInviteGameDto) {
    let opponentClientId: string;
    for (const [key, value] of this.connectionList) {
      if (value === inviteGameDto.opponentId) {
        opponentClientId = key;
      }
    }
    this.userService.handleInviteGame(client, inviteGameDto, opponentClientId);
  }

  @SubscribeMessage('acceptGame')
  async handleAcceptGame(client: Socket, acceptGameDto: ClientAcceptGameDto) {
    let hostClientId: string;
    for (const [key, value] of this.connectionList) {
      if (value === acceptGameDto.hostId) {
        hostClientId = key;
      }
    }
    const serverAcceptGameDto = await this.userService.handleAcceptGame(
      client,
      acceptGameDto,
    );

    this.server.to(client.id).emit('acceptGame', serverAcceptGameDto);
    this.server.to(hostClientId).emit('acceptGame', serverAcceptGameDto);
  }

  @SubscribeMessage('rejectGame')
  async handleRejectGame(client: Socket, userIdDto: UserIdDto) {
    let hostClientId: string;
    for (const [key, value] of this.connectionList) {
      if (value === userIdDto.id) {
        hostClientId = key;
      }
    }
    this.server.to(hostClientId).emit('rejectGame');
  }
}
