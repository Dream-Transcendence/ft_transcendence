import {
  MessageBody,
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomService } from '../chats/rooms.service';
import { v4 as uuidv4 } from 'uuid';

@WebSocketGateway(9090, { namespace: 'chat' })
export class EventsGateway {
  constructor(private readonly roomService: RoomService) {}
  @WebSocketServer()
  server: Server;

  public handleConnection(client: Socket) {
    console.log('connected ', client.id);
  }

  public handleDisconnect(client: Socket): void {
    console.log('disconnected ', client.id);
  }

  @SubscribeMessage('createChannel')
  async createChannel(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: string,
  ) {
    const object = JSON.parse(data);
    const { userId, name, type, salt, participantIds } = object;
    const title = `room:${uuidv4()}`;
    const room = await this.roomService.createChannel({
      userId,
      name,
      type,
      salt,
      title,
      participantIds,
    });
    const { id } = room;
    client.join(title);
    client.emit('getMessage', {
      id,
      name,
      type,
      title,
      message: `${userId}님이 방 '${name}'를 만들었습니다.`,
    });
  }

  @SubscribeMessage('enterMyChannel')
  async enterMyChannel(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: string,
  ) {
    const object = JSON.parse(data);
    const { roomId, userId, title } = object;
    client.rooms.clear();
    client.join(title);
    console.log(`now :${userId}님이 방${roomId}에 들어갔습니다.`);
  }

  @SubscribeMessage('enterChannel')
  async enterChannel(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: string,
  ) {
    const object = JSON.parse(data);
    const { roomId, userId, title, roomPassword } = object;
    await this.roomService.enterChannel(roomId, userId, { salt: roomPassword });
    client.rooms.clear();
    client.join(title);
    client.to(title).emit('getMessage', {
      id: userId,
      message: `${userId}님이 방${roomId}에 들어왔습니다.`,
    });
  }

  @SubscribeMessage('leaveChannel')
  async leaveChannel(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: string,
  ) {
    const object = JSON.parse(data);
    const { roomId, userId, title } = object;
    client.leave(title);
    client.to(title).emit('getMessage', {
      id: userId,
      message: `${userId}님이 방${roomId}에서 나갔습니다.`,
    });
    await this.roomService.deleteChannelParticipant(roomId, userId);
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: string,
  ) {
    const object = JSON.parse(data);
    const { roomId, userId, title, body } = object;
    const date = new Date();
    await this.roomService.sendMessage(
      Number(roomId),
      Number(userId),
      date,
      body,
    );
    client.to(title).emit('getMessage', {
      message: `${userId} : ${body}`,
    });
  }
}
