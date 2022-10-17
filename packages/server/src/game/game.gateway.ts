import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { v4 as uuidv4 } from 'uuid';
import { Socket, Server } from 'socket.io';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import {
  GameInfoDto,
  GameRoomDto,
  GAME_MODE,
  MatchDto,
  MovePaddleDto,
  RoomTitleDto,
} from './game.dto';
import { GameService } from './game.service';

class MatchingInfo {
  constructor(public readonly userId: number, public readonly socket: Socket) {}
}

class GameInfo {
  constructor(private player1: User, private player2: User) {
    this.roomId = uuidv4();
    this.player = { left: player1, right: player2 };
    this.score = { left: 0, right: 0 };
    this.ballPos = { x: 0, y: 0 };
    this.ballSpeed = { x: 0, y: 0 };
    this.paddlePos = { left: 0, right: 0 };
    this.mode = 0;
  }

  roomId: string;
  player: { left: User; right: User };
  score: { left: number; right: number };
  ballPos: { x: number; y: number };
  ballSpeed: { x: number; y: number };
  paddlePos: { left: number; right: number };
  mode: GAME_MODE;

  public getGameRoomDto(): GameRoomDto {
    return {
      id: this.roomId,
      leftPlayer: {
        id: this.player.left.id,
        nickname: this.player.left.nickname,
        image: this.player.left.image,
      },
      rightPlayer: {
        id: this.player.right.id,
        nickname: this.player.right.nickname,
        image: this.player.right.image,
      },
      mode: this.mode,
    };
  }

  public getGameInfoDto(): GameInfoDto {
    return {
      score: this.score,
      ballPos: this.ballPos,
      paddlePos: this.paddlePos,
      mode: this.mode,
    };
  }
}

@WebSocketGateway(4242, {
  namespace: 'game',
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @Inject('USERS_REPOSITORY') private userRepository: Repository<User>,
    private gameService: GameService,
  ) {}
  @WebSocketServer()
  server: Server;

  private matchingQueue: MatchingInfo[][] = [];
  private gameInfoMap: Map<string, GameInfo> = new Map();

  handleConnection() {
    console.log('Game Client connected');
  }

  handleDisconnect() {
    console.log('Game Client disconnected');
  }

  @SubscribeMessage('match')
  async handleMatch(client: Socket, matchDto: MatchDto) {
    console.log('Game Client match', matchDto);
    // NOTE: 유저가 매칭을 요청하면, 매칭 대기열에 추가
    if (this.matchingQueue.length === 0) {
      this.matchingQueue[matchDto.mode].push(
        new MatchingInfo(matchDto.userId, client),
      );
    } else {
      // NOTE: 매칭 대기열에 동일 유저가 있으면, WsException 발생
      this.matchingQueue.map((eachQueue) => {
        eachQueue.map((matchingInfo) => {
          if (matchingInfo.userId === matchDto.userId)
            throw new WsException('이미 매칭 대기열에 있습니다.');
        });
      });

      // NOTE: 매칭 대기열에 유저가 있으면, 매칭(로직이 문제 없는 지 고민해봐야 함)
      const opponent = this.matchingQueue[matchDto.mode].shift();
      const player1 = await this.userRepository.findOneBy({
        id: matchDto.userId,
      });
      const player2 = await this.userRepository.findOneBy({
        id: opponent.userId,
      });
      const gameInfo = new GameInfo(player1, player2);
      this.gameInfoMap[matchDto.mode].set(gameInfo.roomId, gameInfo);

      client.join(gameInfo.roomId);
      opponent.socket.join(gameInfo.roomId);

      this.server
        .to(gameInfo.roomId)
        .emit('matched', gameInfo.getGameRoomDto());
    }
  }

  @SubscribeMessage('cancel')
  async handleCancel(client: Socket, matchDto: MatchDto) {
    console.log('Game Client cancel', matchDto);

    const index = this.matchingQueue[matchDto.mode].findIndex(
      (matchingInfo) => matchingInfo.socket.id === client.id,
    );
    // NOTE: 리스트에서 해당 유저를 삭제하기만 하면 되는데, 응답을 보내야할까?
    this.matchingQueue[matchDto.mode].splice(index, 1);
    client.disconnect();
  }

  @SubscribeMessage('start')
  async handleStart(client: Socket, roomTitleDto: RoomTitleDto) {
    const { title } = roomTitleDto;
    console.log('Game Client start', roomTitleDto);
    // NOTE: 게임 시작
    // this.server
    //   .to(title)
    //   .emit('start', this.gameInfoMap[title].getGameInfoDto());

    // NOTE: 게임 시작 후, 게임 정보를 주기적으로 보내줘야 함
    // TODO: 게임 로직 또는 함수 추가 후 업데이트
    setInterval(() => {
      this.server
        .to(title)
        .emit('gameInfo', this.gameInfoMap[title].getGameInfoDto());
    }, 1000 / 60);
  }

  @SubscribeMessage('movePaddle')
  async handleMovePaddle(client: Socket, movePaddleDto: MovePaddleDto) {
    const { title, playerId, moveDir } = movePaddleDto;

    let movement = 7;
    if (moveDir) movement = -movement;

    if (playerId === this.gameInfoMap[title].player.left.id) {
      this.gameInfoMap[title].paddlePos.left += movement;
    } else {
      this.gameInfoMap[title].paddlePos.right += movement;
    }
  }

  @SubscribeMessage('createGame')
  createGame(@ConnectedSocket() client: Socket, @MessageBody() body: any) {
    this.gameService.createGame(client, body);
  }

  @SubscribeMessage('gameStart')
  gameStart(@ConnectedSocket() client: Socket, @MessageBody() body: any) {
    this.gameService.gameStart(client, body);
  }

  @SubscribeMessage('paddleUp')
  changePaddle(@ConnectedSocket() client, @MessageBody() body: any) {
    this.gameService.changePaddle(client, body);
  }
}
