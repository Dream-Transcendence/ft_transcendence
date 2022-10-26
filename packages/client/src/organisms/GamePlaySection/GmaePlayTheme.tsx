import {
  BallProps,
  CanvasImgProps,
  PaddleProps,
  ResponsiveGameProps,
} from '../../types/Game.type';

const smallCanvasImgProps: CanvasImgProps = {
  width: 480,
  height: 250,
};

const smallBallProps: BallProps = {
  diameter: 20,
};

const smallPaddleProps: PaddleProps = {
  width: 10,
  height: 75,
  posX: 470,
};

const largeCanvasImgProps: CanvasImgProps = {
  width: 1024,
  height: 620,
};

const largeBallProps: BallProps = {
  diameter: 40,
};

const largePaddleProps: PaddleProps = {
  width: 20,
  height: 186,
  posX: 1004,
};

export const smallTheme: ResponsiveGameProps = {
  canvasImgProps: smallCanvasImgProps,
  ballProps: smallBallProps,
  paddleProps: smallPaddleProps,
};

export const largeTheme: ResponsiveGameProps = {
  canvasImgProps: largeCanvasImgProps,
  ballProps: largeBallProps,
  paddleProps: largePaddleProps,
};
