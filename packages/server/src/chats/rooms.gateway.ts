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
  PatchUserInfoDto,
} from './dto/rooms.dto';

@WebSocketGateway(4242, { namespace: 'chat', cors: true })
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
    return await this.roomService.enterChannel(client, enterChannelDto);
  }

  @SubscribeMessage('deleteChannelParticipant')
  async deleteChannelParticipant(
    @ConnectedSocket() client: Socket,
    @MessageBody() leaveChannelDto: LeaveChannelDto,
  ) {
    return await this.roomService.deleteChannelParticipant(
      client,
      leaveChannelDto,
    );
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() sendMessageDto: SendMessageDto,
  ) {
    await this.roomService.sendMessage(client, sendMessageDto);
  }

  @SubscribeMessage('patchUserInfo')
  async patchUserInfo(
    @ConnectedSocket() client: Socket,
    @MessageBody() patchUserInfoDto: PatchUserInfoDto,
  ) {
    await this.roomService.patchUserInfo(client, patchUserInfoDto);
  }
}
