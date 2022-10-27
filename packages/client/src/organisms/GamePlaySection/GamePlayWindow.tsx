import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import GameResultModal from '../../molecules/GameSecton/GameResultMadal';
import {
  GAMEEND,
  gameNameSpace,
  GAMEPROCESS,
  GAMESTART,
  MOVEPADDLE,
  RESIZEWINDOW,
} from '../../socket/event';
import useSocket from '../../socket/useSocket';
import { height } from '@mui/system';
import {
  BallProps,
  CanvasImgProps,
  CanvasProps,
  gameInfoPropsType,
  GameOffsetProps,
  GameWindowInfo,
  PaddleProps,
  ResponsiveGameProps,
  ScoreProps,
} from '../../types/Game.type';
import { DOWN, LARGE, SMALL, STOP, UP } from '../../configs/Game.type';
import { largeTheme, smallTheme } from './GmaePlayTheme';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userDataAtom } from '../../recoil/user.recoil';
import UserProfileBox from '../../molecules/ProfileSection/UserProfileBox';
import {
  UserProfileBoxDataType,
  UserProfileBoxType,
} from '../../types/Profile.type';

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
        position: 'absolute',
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
        borderRadius: '30%',
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
        borderRadius: '30%',
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
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '4%',
  color: '#ffdd',
  width: `100%`,
  height: `20%`,
}));

const LeftUserProfile = styled('div')(({ theme }) => ({
  width: '12%',
  height: '60%',
  zIndex: '2',
  marginTop: '8%',
  marginRight: '50%',
  position: 'absolute',
}));

const RightUserProfile = styled('div')(({ theme }) => ({
  width: '12%',
  height: '60%',
  marginTop: '8%',
  marginLeft: '50%',
  zIndex: '2',
  position: 'absolute',
}));

function GamePlayWindowOrganism(props: { gameInfoProps: gameInfoPropsType }) {
  const { value: gameInfo, setter: setGameInfo } = props.gameInfoProps;
  const [socket] = useSocket(gameNameSpace);
  const userData = useRecoilValue(userDataAtom);
  const [time, setTime] = useState<number>(3);
  const timeRef = useRef(4);
  const [IsStart, setIsStart] = useState<boolean>(true);
  const [score, setScore] = useState<ScoreProps | undefined>(gameInfo?.score);
  const [open, setOpen] = useState(false);
  const [offset, setOffset] = useState<GameOffsetProps>({
    ballPosX: gameInfo?.ballPos.x,
    ballPosY: gameInfo?.ballPos.y,
    LeftPaddlePosY: gameInfo?.paddlePos.left,
    RightPaddlePosY: gameInfo?.paddlePos.right,
  });
  const [theme, setTheme] = useState<ResponsiveGameProps>(smallTheme);
  const [size, setSize] = useState<number>(SMALL);
  const [windowSize, setWindowSize] = useState<GameWindowInfo>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [moveDir, setMoveDir] = useState<number>(STOP);
  const defaultUser: UserProfileBoxDataType = {
    id: 0,
    nickname: '',
    image: '',
  };

  const handleOpen = () => {
    setOpen(true);
  };

  /* 게임 시작을 위해 서버로 정보를 날리는 로직 */
  useEffect(() => {
    const startGame = async () => {
      setTimeout(() => {
        console.log('GAME START');
        socket.emit(`${GAMESTART}`, {
          title: gameInfo?.title,
          userId: userData.id,
        });
      }, 4500);
      setIsStart(false);
    };
    if (IsStart === true) startGame();
  }, [IsStart]);

  //마운트시 초기화가 되어서 무한랜더링됨.
  //ref로 해결

  /* 게임 시작을 위한 카운트 다운을 세는 로직 */
  useEffect(() => {
    const countReady = async () => {
      const intervalId = await setInterval(() => {
        if (timeRef.current <= 0) clearInterval(intervalId);
        timeRef.current -= 1;
        setTime(timeRef.current);
      }, 1000);
    };
    if (IsStart === false && time === 3) countReady();
  }, [IsStart, time]);

  /* 게임 시작 시, 현재 패들과 공의 위치값 받아오는 로직 */
  useEffect(() => {
    const getGameProcess = () => {
      socket.on(`${GAMEPROCESS}`, (res) => {
        if (time > 0) setTime(0);
        if (res.size === LARGE) {
          setTheme(largeTheme);
          setSize(LARGE);
        } else {
          setTheme(smallTheme);
          setSize(SMALL);
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
  }, [IsStart, time, offset, setOffset]);

  /* 게임 결과를 산정하고, 조건 미달 시, 재시작을 위한 상태초기화 */
  useEffect(() => {
    const getGameResult = () => {
      socket.on(`${GAMEEND}`, (res) => {
        setScore({
          ...score,
          left: res.score.left,
          right: res.score.right,
        });
        if (res.score.left === 3 || res.score.right === 3) {
          handleOpen();
          setOpen(true);
        } else {
          setIsStart(true);
          setTime(3);
          timeRef.current = 4;
        }
      });
    };
    getGameResult();
  }, [IsStart, socket, score, setScore, setOpen]);

  function resizeWindow() {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    console.log(
      'window size:',
      window.innerHeight,
      window.innerWidth,
      windowSize,
    );
  }

  /*변경된 사이즈를 분석하여 현재 테마의 크기상태를 변경하는 로직 */
  useEffect(() => {
    if (
      windowSize.width >= largeTheme.canvasImgProps.width + 400 &&
      windowSize.height >= largeTheme.canvasImgProps.height + 500
    ) {
      if (size === SMALL) {
        setSize(LARGE);
        setTheme(largeTheme);
      }
    } else if (
      windowSize.width < largeTheme.canvasImgProps.width + 300 ||
      windowSize.height < largeTheme.canvasImgProps.height - 100
    ) {
      if (size === LARGE) {
        setSize(SMALL);
        setTheme(smallTheme);
      }
    }
  }, [windowSize, size]);

  /* 사이즈 변경 사항을 저장하는 로직 */
  useEffect(() => {
    let timeId: any = null;
    window.onresize = function () {
      clearTimeout(timeId);
      // resizeWindow(); //settimeout으로 조절하지 않으면 과부화가 걸릴 수 있다고함
      timeId = setTimeout(resizeWindow, 100);
    };
  }, [windowSize]);

  /* 사이즈 변경 사항을 서버에 알려주는 로직 */
  useEffect(() => {
    socket.emit(`${RESIZEWINDOW}`, {
      title: gameInfo?.title,
      size: size,
    });
  }, [size]);

  useEffect(() => {
    /* 윈도우 이벤트 발생시 바로 날려주는 방식 */
    window.addEventListener('keydown', (e) => {
      // console.log('keyevent', e.key, e.key === 'ArrowUp');
      if (e.key === 'ArrowUp') {
        socket.emit(`${MOVEPADDLE}`, {
          title: gameInfo?.title,
          playerId: userData.id,
          moveDir: UP,
        });
        console.log('keyevent', e.key, 'ArrowUp');
      } else if (e.key === 'ArrowDown') {
        socket.emit(`${MOVEPADDLE}`, {
          title: gameInfo?.title,
          playerId: userData.id,
          moveDir: DOWN,
        });
        console.log('keyevent', e.key, 'ArrowDown');
      }
    });
  }, []);

  /* 상태관리를 통한 게임 구현 */

  // useEffect(() => {
  //   window.addEventListener('keydown', (e) => {
  //     console.log('???lkkk??? ', moveDir);
  //     // console.log('keyevent', e.key, e.key === 'ArrowUp');
  //     if (e.key === 'ArrowUp') {
  //       console.log('up', moveDir);
  //       setMoveDir(STOP);
  //       setMoveDir(UP);
  //     } else if (e.key === 'ArrowDown') {
  //       console.log('down', moveDir);
  //       setMoveDir(STOP);
  //       setMoveDir(DOWN);
  //     }
  //   });
  // }, [setMoveDir]);

  // useEffect(() => {
  //   console.log('??? stopr??? ', moveDir);
  //   if (moveDir !== STOP) {
  //     // socket.emit(`${MOVEPADDLE}`, {
  //     //   title: '',
  //     //   playerId: userData.id,
  //     //   moveDir: moveDir,
  //     // });
  //     // setMoveDir(null);
  //     if (moveDir === UP) {
  //       console.log('STOP up', moveDir);
  //       setMoveDir(STOP);
  //     } else if (moveDir === DOWN) {
  //       console.log('STOP down', moveDir);
  //       setMoveDir(STOP);
  //     }
  //   }
  // }, [moveDir, setMoveDir]);

  // const handleKeyDown = (event) => {
  //   console.log;
  // };

  const leftPlayerProfile: UserProfileBoxType = {
    isButton: false,
    avatarType: 'default',
    userData: gameInfo?.leftPlayer || defaultUser,
  };

  const rightPlayerProfile: UserProfileBoxType = {
    isButton: false,
    avatarType: 'circle',
    userData: gameInfo?.rightPlayer || defaultUser,
  };

  return (
    <GameWindowLayout>
      <GameLayout>
        <ScoreLayout>
          <LeftUserProfile>
            {' '}
            <UserProfileBox userProfileBoxProps={leftPlayerProfile} />
          </LeftUserProfile>
          {score?.left} : {score?.right}
          <RightUserProfile>
            {' '}
            <UserProfileBox userProfileBoxProps={rightPlayerProfile} />
          </RightUserProfile>
        </ScoreLayout>
        {time < 4 && time > 0 ? (
          <PreGamePlayCanvasLayout
            width={theme.canvasImgProps.width}
            height={theme.canvasImgProps.height}
          >
            <ReadCountLayout>
              <ReadCount>{time}</ReadCount>
            </ReadCountLayout>
          </PreGamePlayCanvasLayout>
        ) : (
          <GamePlayCanvasLayout
            width={theme.canvasImgProps.width}
            height={theme.canvasImgProps.height}
          >
            <LeftPaddleLayout
              width={theme.paddleProps.width}
              height={theme.paddleProps.height}
              posX={0}
              posY={offset.LeftPaddlePosY}
            />
            <BallLayout
              diameter={theme.ballProps.diameter}
              posX={offset.ballPosX}
              posY={offset.ballPosY}
            />
            <RightPaddleLayout
              width={theme.paddleProps.width}
              height={theme.paddleProps.height}
              posX={theme.paddleProps.posX}
              posY={offset.RightPaddlePosY}
            />
          </GamePlayCanvasLayout>
        )}
      </GameLayout>
      <GameResultModal
        open={open}
        setOpen={setOpen}
        score={score}
        gameInfo={gameInfo}
      />
    </GameWindowLayout>
  );
}

export default GamePlayWindowOrganism;
