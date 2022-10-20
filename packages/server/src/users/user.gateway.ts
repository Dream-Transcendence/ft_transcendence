import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConnectionDto, ConnectionsDto } from './dto/connect-user.dto';
import {
  ClientAcceptGameDto,
  ClientInviteGameDto,
  Connection,
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

  private connectionList = new Map<string, Connection>();

  setConnection(userId: number, onGame: boolean) {
    let clientId: string;
    for (const [key, value] of this.connectionList) {
      if (value.userId === userId) {
        clientId = key;
      }
    }
    this.connectionList.get(clientId).onGame = onGame;
    const connection = this.connectionList.get(clientId);
    const connectionDto = new ConnectionDto(
      connection.userId,
      connection.onGame,
    );

    this.server.emit('changeUserStatus', { connection: connectionDto });
  }

  getConnectionList() {
    return this.connectionList;
  }

  async handleConnection(client: Socket) {
    console.log('User Client connected', client.id);
  }

  async handleDisconnect(client: Socket) {
    console.log('User Client disconnected', client.id);
    const userId = this.connectionList.get(client.id).userId;

    client.broadcast.emit('UserLogOff', { userId: userId });

    this.connectionList.delete(client.id);
  }

  @SubscribeMessage('logOn')
  async handleLogOn(client: Socket, connectionDto: ConnectionDto) {
    const onlineUserList = Array.from(this.connectionList.values());

    this.connectionList.set(client.id, {
      userId: connectionDto.userId,
      onGame: false,
    });

    client.broadcast.emit('changeUserStatus', {
      connection: { userId: connectionDto.userId, onGame: false },
    });

    const connectionsDto = new ConnectionsDto();
    connectionsDto.connections = onlineUserList.map((value) => {
      return new ConnectionDto(value.userId, value.onGame);
    });

    return connectionsDto;
  }

  @SubscribeMessage('inviteGame')
  async handleInviteGame(client: Socket, inviteGameDto: ClientInviteGameDto) {
    let opponentClientId: string;

    this.setConnection(inviteGameDto.hostId, true);

    for (const [key, value] of this.connectionList) {
      if (value.userId === inviteGameDto.opponentId) {
        opponentClientId = key;
      }
    }
    this.userService.handleInviteGame(client, inviteGameDto, opponentClientId);
  }

  @SubscribeMessage('acceptGame')
  async handleAcceptGame(client: Socket, acceptGameDto: ClientAcceptGameDto) {
    let hostClientId: string;

    for (const [key, value] of this.connectionList) {
      if (value.userId === acceptGameDto.hostId) {
        hostClientId = key;
      }
    }
    this.setConnection(this.connectionList.get(client.id).userId, true);

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
      if (value.userId === userIdDto.id) {
        hostClientId = key;
      }
    }
    this.server.to(hostClientId).emit('rejectGame');
  }
}
