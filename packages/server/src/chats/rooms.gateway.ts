import {
  MessageBody,
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomService } from './rooms.service';
import {
  EnterChannelDto,
  LeaveChannelDto,
  SendMessageDto,
} from './dto/rooms.dto';

@WebSocketGateway(9090, { namespace: 'chat' })
export class RoomsGateway {
  constructor(private readonly roomService: RoomService) {}
  @WebSocketServer()
  server: Server;

  public handleConnection(client: Socket) {
    console.log('connected ', client.id);
  }

  public handleDisconnect(client: Socket): void {
    console.log('disconnected ', client.id);
  }

  @SubscribeMessage('enterChannel')
  async enterChannel(
    @ConnectedSocket() client: Socket,
    @MessageBody() enterChannelDto: EnterChannelDto,
  ) {
    await this.roomService.enterChannel(client, enterChannelDto);
  }

  @SubscribeMessage('leaveChannel')
  async leaveChannel(
    @ConnectedSocket() client: Socket,
    @MessageBody() leaveChannelDto: LeaveChannelDto,
  ) {
    await this.roomService.leaveChannel(client, leaveChannelDto);
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() sendMessageDto: SendMessageDto,
  ) {
    await this.roomService.sendMessage(client, sendMessageDto);
  }
}
