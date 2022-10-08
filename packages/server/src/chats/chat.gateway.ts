import { UsePipes, ValidationPipe } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EnterChannelDto, LeaveChannelDto } from './dto/rooms.dto';
import { RoomService } from './rooms.service';

@WebSocketGateway(4242, {
  namespace: 'chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly roomService: RoomService) {}
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Chat Client connected', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Chat Client disconnected', client.id);
  }

  @SubscribeMessage('enterChannel')
  // NOTE: 클래스 Validation 로직이 적용이 안됨...
  // 별도로 로직을 짜서 적용해야 하는 지 고민
  handleEnterChannel(client: Socket, enterChannelDto: EnterChannelDto) {
    return this.roomService.handleEnterChannel(client, enterChannelDto);
  }

  @SubscribeMessage('leaveChannel')
  handleLeaveChannel(client: Socket, leaveChannelDto: LeaveChannelDto) {
    return this.roomService.handleLeaveChannel(client, leaveChannelDto);
  }

  @SubscribeMessage('sendMessage')
  handleSendMessage(client: Socket, sendMessageDto: any) {
    return this.roomService.handleSendMessage(client, sendMessageDto);
  }
}
