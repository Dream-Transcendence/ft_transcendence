import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EnterChannelDto } from './dto/rooms.dto';
import { RoomService } from './rooms.service';

@WebSocketGateway(4244, {
  namespace: 'chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly roomService: RoomService) {}
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected', client.id);
  }

  @SubscribeMessage('enterChannel')
  handleEnterChannel(client: Socket, enterChannelDto: EnterChannelDto) {
    this.roomService.enterChannel2(client, enterChannelDto);
  }
}
