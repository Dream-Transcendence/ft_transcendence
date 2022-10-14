import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConnectionDto } from './dto/connect-user.dto';
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
}
