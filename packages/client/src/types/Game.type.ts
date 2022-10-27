import { Socket } from 'socket.io-client';
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
  value: GameRoomDto | undefined;
  setter: React.Dispatch<React.SetStateAction<GameRoomDto | undefined>>;
}
export interface CanvasProps {
  children?: JSX.Element[];
  width: number;
  height: number;
}

export interface CanvasImgProps {
  children?: JSX.Element;
  width: number;
  height: number;
}

export interface BallProps {
  children?: JSX.Element;
  diameter: number;
  posX?: number;
  posY?: number;
}

export interface PaddleProps {
  children?: JSX.Element;
  width: number;
  height: number;
  posX?: number;
  posY?: number;
}

export interface ScoreProps {
  left: number;
  right: number;
}

export interface ResponsiveGameProps {
  canvasImgProps: CanvasImgProps;
  ballProps: BallProps;
  paddleProps: PaddleProps;
}

export interface GameOffsetProps {
  ballPosX?: number;
  ballPosY?: number;
  LeftPaddlePosY?: number;
  RightPaddlePosY?: number;
}

export interface GameResultModalControl {
  open: boolean;
  setOpen: (open: boolean) => void;
  score?: ScoreProps;
}

export interface GameWindowInfo {
  width: number;
  height: number;
}
