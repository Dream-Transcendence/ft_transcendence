import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import GameResultModal from '../../molecules/GameSecton/GameResultMadal';
import {
  GAMEEND,
  gameNameSpace,
  GAMEPROCESS,
  GAMESTART,
} from '../../socket/event';
import useSocket from '../../socket/useSocket';
import { height } from '@mui/system';
import {
  BallProps,
  CanvasImgProps,
  CanvasProps,
  GameOffsetProps,
  PaddleProps,
  ResponsiveGameProps,
  ScoreProps,
} from '../../types/Game.type';
import { LARGE, SMALL } from '../../configs/Game.type';

const GameLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
}));

const GamePlayCanvasLayout = ({ children, width, height }: CanvasProps) => {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        marginBottom: '3%',
        background: 'linear-gradient(to bottom right, blue, pink)',
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      {children}
    </div>
  );
};

const PreGamePlayCanvasLayout = ({
  children,
  width,
  height,
}: CanvasImgProps) => {
  return (
    <div
      style={{
        display: 'flex',
        marginBottom: '3%',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(blue, pink)',
        opacity: '0.5',
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      {children}
    </div>
  );
};

const BallLayout = ({ children, diameter, posX, posY }: BallProps) => {
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '100%',
        width: `${diameter}px`,
        height: `${diameter}px`,
        top: `${posY}px`,
        left: `${posX}px`,
      }}
    >
      {children}
    </div>
  );
};

const LeftPaddleLayout = ({
  children,
  width,
  height,
  posX,
  posY,
}: PaddleProps) => {
  return (
    <div
      style={{
        backgroundColor: '#00ffff',
        position: 'absolute',
        width: `${width}px`,
        height: `${height}px`,
        top: `${posY}px`,
        left: `${posX}px`,
      }}
    >
      {children}
    </div>
  );
};

const RightPaddleLayout = ({
  children,
  width,
  height,
  posX,
  posY,
}: PaddleProps) => {
  return (
    <div
      style={{
        backgroundColor: '#Ff7ad5',
        position: 'absolute',
        width: `${width}px`,
        height: `${height}px`,
        top: `${posY}px`,
        left: `${posX}px`,
      }}
    >
      {children}
    </div>
  );
};

const GameWindowLayout = styled('div')(({ theme }) => ({
  // backgroundColor: '#43334f',
  width: `100%`,
  height: `100%`,
}));

const ReadCountLayout = styled('div')(({ theme }) => ({
  width: '12%',
  height: '60%',
}));

const ReadCount = styled('span')(({ theme }) => ({
  fontSize: '140px',
  color: '#ffd300',
}));

const ScoreLayout = styled('span')(({ theme }) => ({
  fontSize: '500%',
  textAlign: 'center',
  marginBottom: '4%',
  color: '#ffdd',
  width: `100%`,
  height: `20%`,
}));

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
  width: 480,
  height: 250,
};

const largeBallProps: BallProps = {
  diameter: 20,
};

const largePaddleProps: PaddleProps = {
  width: 10,
  height: 75,
  posX: 470,
};

function GamePlayWindowOrganism() {
  const [socket] = useSocket(gameNameSpace);
  const [time, setTime] = useState<number>(3);
  const timeRef = useRef(4);
  const [IsStart, setIsStart] = useState<boolean>(true);
  const [score, setScore] = useState<ScoreProps>({
    left: 0,
    right: 0,
  });
  const [open, setOpen] = useState(false);
  const [offset, setOffset] = useState<GameOffsetProps>({
    ballPosX: 100,
    ballPosY: 100,
    LeftPaddlePosY: 100,
    RightPaddlePosY: 100,
  });
  const [size, setSize] = useState<ResponsiveGameProps>({
    canvasImgProps: largeCanvasImgProps,
    ballProps: largeBallProps,
    paddleProps: largePaddleProps,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const startGame = async () => {
      setTimeout(() => {
        console.log('GAME START');
        // socket.emit(`${GAMESTART}`, {
        //   title: '',
        // });
      }, 4500);
      setIsStart(false);
    };
    if (IsStart === true) startGame();
  }, [IsStart]);

  //마운트시 초기화가 되어서 무한랜더링됨.
  //ref로 해결
  useEffect(() => {
    const countReady = async () => {
      const intervalId = await setInterval(() => {
        if (timeRef.current <= 1) clearInterval(intervalId);
        timeRef.current -= 1;
        setTime(timeRef.current);
      }, 1000);
    };
    if (IsStart === false && time === 3) countReady();
  }, [IsStart, time]);

  useEffect(() => {
    const getGameProcess = () => {
      socket.on(`${GAMEPROCESS}`, (res) => {
        if (res.size === LARGE) {
          setSize({
            canvasImgProps: largeCanvasImgProps,
            ballProps: largeBallProps,
            paddleProps: largePaddleProps,
          });
        } else {
          setSize({
            canvasImgProps: smallCanvasImgProps,
            ballProps: smallBallProps,
            paddleProps: smallPaddleProps,
          });
        }
        setOffset({
          ballPosX: res.ballPos.x,
          ballPosY: res.ballPos.y,
          LeftPaddlePosY: res.paddlePos.left,
          RightPaddlePosY: res.paddlePos.right,
        });
      });
    };
    getGameProcess();
  }, [IsStart, time]);

  useEffect(() => {
    const getGameResult = () => {
      socket.on(`${GAMEEND}`, (res) => {
        if (res.left === 3 || res.right === 3) {
          handleOpen();
        } else {
          setScore(res);
          setIsStart(true);
          setTime(3);
          timeRef.current = 4;
        }
      });
    };
    getGameResult();
  }, [IsStart, socket]);

  return (
    <GameWindowLayout>
      <GameLayout>
        <ScoreLayout>
          {score.left} : {score.right}
        </ScoreLayout>
        {time < 4 && time > 0 ? (
          <PreGamePlayCanvasLayout
            width={size.canvasImgProps.width}
            height={size.canvasImgProps.height}
          >
            <ReadCountLayout>
              <ReadCount>{time}</ReadCount>
            </ReadCountLayout>
          </PreGamePlayCanvasLayout>
        ) : (
          <GamePlayCanvasLayout
            width={size.canvasImgProps.width}
            height={size.canvasImgProps.height}
          >
            <LeftPaddleLayout
              width={size.paddleProps.width}
              height={size.paddleProps.height}
              posX={0}
              posY={offset.LeftPaddlePosY}
            />
            <BallLayout
              diameter={size.ballProps.diameter}
              posX={offset.ballPosX}
              posY={offset.ballPosY}
            />
            <RightPaddleLayout
              width={size.paddleProps.width}
              height={size.paddleProps.height}
              posX={size.paddleProps.posX}
              posY={offset.RightPaddlePosY}
            />
          </GamePlayCanvasLayout>
        )}
      </GameLayout>
      <GameResultModal open={open} setOpen={setOpen} score={score} />
    </GameWindowLayout>
  );
}

export default GamePlayWindowOrganism;
