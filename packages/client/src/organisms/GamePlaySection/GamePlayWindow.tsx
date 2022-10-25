import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import GameResultModal from '../../molecules/GameSecton/GameResultMadal';
import { gameNameSpace, GAMEPROCESS } from '../../socket/event';
import useSocket from '../../socket/useSocket';
import { height } from '@mui/system';
import { CanvasProps } from '../../types/Game.type';

const GameLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
}));

const GamePlayLayout = ({ children, width, height }: CanvasProps) => {
  return (
    <div
      style={{
        backgroundColor: '#43334f',
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      {children}
    </div>
  );
};

const PreGamePlayLayout = ({ children, width, height }: CanvasProps) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#43334f',
        width: `${width}px`,
        height: `${height}px`,
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

function GamePlayWindowOrganism() {
  const [socket] = useSocket(gameNameSpace);
  const [time, setTime] = useState<number>(3);
  const timeRef = useRef(4);
  const [IsStart, setIsStart] = useState<boolean>(false);

  useEffect(() => {
    const startGame = async () => {
      setTimeout(() => {
        console.log('GAME START');
        // socket.emit(`${GAMESTART}`, {
        //   title: '',
        // });
      }, 4500);
      setIsStart(true);
    };
    if (IsStart === false) startGame();
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
    if (IsStart === true && time === 3) countReady();
  }, [IsStart, time]);

  useEffect(() => {
    const getGameProcess = () => {
      socket.on(`${GAMEPROCESS}`, (res) => {});
    };
  }, [IsStart, time]);

  return (
    <GameWindowLayout>
      <GameLayout>
        {time < 4 && time > 0 ? (
          <PreGamePlayLayout width={480} height={250}>
            <ReadCountLayout>
              <ReadCount>{time}</ReadCount>
            </ReadCountLayout>
          </PreGamePlayLayout>
        ) : (
          <GamePlayLayout width={480} height={250}></GamePlayLayout>
        )}
      </GameLayout>
      {/* <GameResultModal /> */}
    </GameWindowLayout>
  );
}

export default GamePlayWindowOrganism;
