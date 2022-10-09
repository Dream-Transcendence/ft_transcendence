import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { logOffDto, LogOnDto } from './dto/connect-user.dto';
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

  handleConnection(client: Socket) {
    console.log('User Client connected', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('User Client disconnected', client.id);

    const userId = this.connectionList.get(client.id);
    if (userId) this.connectionList.delete(client.id);

    client.broadcast.emit('detectLogOff', { userId: userId });
  }

  @SubscribeMessage('logOn')
  async handleLogOn(client: Socket, logOnDto: LogOnDto) {
    const onlineUserList = Array.from(this.connectionList.values());

    this.connectionList.set(client.id, logOnDto.userId);
    client.broadcast.emit('detectLogOn', logOnDto);

    console.log('connectionList', this.connectionList);

    return {
      onlineFriendList: await this.userService.handleLogOn(
        logOnDto.userId,
        onlineUserList,
      ),
    };
  }
}
