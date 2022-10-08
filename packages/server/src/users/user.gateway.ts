import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway(4242, {
  namespace: 'user',
})
export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
  // NOTE: 유저와 채팅 게이트웨이를 분리해야할까?(연결을 별도로 구성해야 하나?)
  handleConnection(client: Socket) {
    console.log('User Client connected', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('User Client disconnected', client.id);
  }

  @SubscribeMessage('logOn')
  handleLogOn(client: Socket, logOnDto: any) {
    return;
  }

  @SubscribeMessage('logOff')
  handleLogoff(client: Socket, logOffDto: any) {
    return;
  }
}
