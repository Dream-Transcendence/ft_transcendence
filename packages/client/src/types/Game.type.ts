import { Socket } from "socket.io-client";
import { DefaultEventsMap } from '@socket.io/component-emitter';

export interface GameRoomDto {
  title: string;
  leftPlayer: {
    id: number;
    nickname: string;
    image: string;
  };
  rightPlayer: {
    id: number;
    nickname: string;
    image: string;
  };
  ballPos: { x: number; y: number };
  paddlePos: { left: number; right: number };
  score: { left: number; right: number };
  mode: number;
}

export interface gameInfoPropsType {
  value: GameRoomDto | undefined,
  setter: React.Dispatch<React.SetStateAction<GameRoomDto | undefined>>,
  socket: Socket<DefaultEventsMap, DefaultEventsMap>,
}