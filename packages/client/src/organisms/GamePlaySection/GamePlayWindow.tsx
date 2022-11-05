import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import GameResultModal from '../../molecules/GameSecton/GameResultMadal';
import {
  GAMEEND,
  gameNameSpace,
  GAMEPROCESS,
  GAMESTART,
  MOVEPADDLE,
  PLAYERABSTENTION,
  RESIZEWINDOW,
} from '../../socket/event';
import useSocket from '../../socket/useSocket';
import { height } from '@mui/system';
import { Typography } from '@mui/material';
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
import {
  DOWN,
  LARGE,
  NORMALBALLMODE,
  SIZEDOWN,
  SMALL,
  SMALLBALLMODE,
  STOP,
  UP,
} from '../../configs/Game.type';
import { largeTheme, smallTheme } from './GmaePlayTheme';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userDataAtom } from '../../recoil/user.recoil';
import UserProfileBox from '../../molecules/ProfileSection/UserProfileBox';
import {
  UserProfileBoxDataType,
  UserProfileBoxType,
} from '../../types/Profile.type';
import { useNavigate, useParams } from 'react-router-dom';
import { NOTFOUNDURL } from '../../configs/Link.url';
import { gameInfoAtom } from '../../recoil/game.recoil';

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
        minHeight: '310px',
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

const ReadyCount = styled('span')(({ theme }) => ({
  fontSize: '6.5vh',
  marginLeft: '-50%',
  color: '#ffd300',
}));

const ScoreLayout = styled('span')(({ theme }) => ({
  fontSize: '500%',
  textAlign: 'center',
  marginBottom: '4%',
  color: '#ffdd',
  width: `30%`,
}));

const GameInfoLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '4%',
  width: `100%`,
  height: `10%`,
  minHeight: '80px',
}));

const LeftUserProfile = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const RightUserProfile = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const HowToUseLayout = styled('div')(({ theme }) => ({
  width: '600px',
  height: '100px',
  zIndex: '2',
  marginLeft: '2%',
  position: 'absolute',
}));

function GamePlayWindowOrganism() {
  const [gameInfo, setGameInfo] = useRecoilState(gameInfoAtom);
  const [socket] = useSocket(gameNameSpace);
  const userData = useRecoilValue(userDataAtom);
  const [time, setTime] = useState<number>(3);
  const timeRef = useRef(4);
  const [IsStart, setIsStart] = useState<boolean>(true);
  const [score, setScore] = useState<ScoreProps | undefined>(gameInfo?.score);
  const [abstention, setAbstention] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [offset, setOffset] = useState<GameOffsetProps>({
    ballPosX: gameInfo?.ballPos.x,
    ballPosY: gameInfo?.ballPos.y,
    LeftPaddlePosY: gameInfo?.paddlePos.left,
    RightPaddlePosY: gameInfo?.paddlePos.right,
  });
  const [theme, setTheme] = useState<ResponsiveGameProps>(smallTheme);
  const [size, setSize] = useState<number>(SMALL);
  const { urlTitle } = useParams();
  const [ballMode, setBallMode] = useState<number>(NORMALBALLMODE);
  const [windowSize, setWindowSize] = useState<GameWindowInfo>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const navigate = useNavigate();
  const defaultUser: UserProfileBoxDataType = {
    id: 0,
    nickname: '',
    image: '',
  };

  useEffect(() => {
    if (urlTitle !== gameInfo?.title || gameInfo?.title === undefined)
      navigate(`${NOTFOUNDURL}`);
  }, [urlTitle]);

  useEffect(() => {
    if (gameInfo?.mode === SIZEDOWN) setBallMode(SMALLBALLMODE);
  }, []);

  /* 게임 시작을 위해 서버로 정보를 날리는 로직 */
  useEffect(() => {
    const startGame = async () => {
      if (
        userData.id === gameInfo?.leftPlayer.id ||
        userData.id === gameInfo?.rightPlayer.id
      ) {
        setTimeout(() => {
          console.log('GAME START');
          socket.emit(`${GAMESTART}`, {
            title: gameInfo?.title,
            userId: userData.id,
          });
        }, 4500);
      }
      setIsStart(false);
    };
    if (IsStart === true) startGame();
  }, [IsStart]);

  useEffect(() => {
    return () => {
      console.log('game over!!!!');
    };
  }, []);

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
    if (
      IsStart === false &&
      time === 3 &&
      (userData.id === gameInfo?.leftPlayer.id ||
        userData.id === gameInfo?.rightPlayer.id)
    ) {
      countReady();
    }
  }, [IsStart, time]);

  /* 게임 시작 시, 현재 패들과 공의 위치값 받아오는 로직 */
  useEffect(() => {
    const getGameProcess = () => {
      socket.on(`${GAMEPROCESS}`, (res) => {
        if (time > 0) setTime(0);
        setOffset({
          ballPosX: res.ballPos.x * size,
          ballPosY: res.ballPos.y * size,
          LeftPaddlePosY: res.paddlePos.left * size,
          RightPaddlePosY: res.paddlePos.right * size,
        });
      });
    };
    getGameProcess();
  }, [IsStart, time, offset, setOffset, size]);

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
  }

  /*변경된 사이즈를 분석하여 현재 테마의 크기상태를 변경하는 로직 */
  useEffect(() => {
    if (
      windowSize.width >= largeTheme.canvasImgProps.width + 400 &&
      windowSize.height >= largeTheme.canvasImgProps.height + 700
    ) {
      if (size === SMALL) {
        setSize(LARGE);
        setTheme(largeTheme);
      }
    } else if (
      windowSize.width < largeTheme.canvasImgProps.width + 400 ||
      windowSize.height < largeTheme.canvasImgProps.height + 700
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

  useEffect(() => {
    /* 윈도우 이벤트 발생시 바로 날려주는 방식 */
    // 관전유저가 들어올 경우, 이벤트 처리  막아줌
    if (
      (userData.id === gameInfo?.leftPlayer.id ||
        userData.id === gameInfo?.rightPlayer.id) &&
      abstention === 0
    ) {
      window.addEventListener('keydown', (e) => {
        // console.log('keyevent', e.key, e.key === 'ArrowUp');
        if (e.key === 'ArrowUp') {
          socket.emit(`${MOVEPADDLE}`, {
            title: gameInfo?.title,
            playerId: userData.id,
            moveDir: UP,
          });
        } else if (e.key === 'ArrowDown') {
          socket.emit(`${MOVEPADDLE}`, {
            title: gameInfo?.title,
            playerId: userData.id,
            moveDir: DOWN,
          });
        }
      });
    }
  }, []);

  /* 상대방 기권 감지 */
  useEffect(() => {
    socket.on(PLAYERABSTENTION, (res) => {
      setAbstention(res.abstainedPlayer);
      setOpen(true);
    });
  }, [socket]);

  const leftPlayerProfile: UserProfileBoxType = {
    isButton: false,
    avatarType: 'default',
    userData: gameInfo?.leftPlayer || defaultUser,
  };

  const rightPlayerProfile: UserProfileBoxType = {
    isButton: false,
    avatarType: 'default',
    userData: gameInfo?.rightPlayer || defaultUser,
  };

  console.log(gameInfo, time);
  return (
    <GameWindowLayout>
      <GameLayout>
        <GameInfoLayout>
          <LeftUserProfile>
            <UserProfileBox userProfileBoxProps={leftPlayerProfile} />
          </LeftUserProfile>
          <ScoreLayout>
            {score?.left} : {score?.right}
          </ScoreLayout>
          <RightUserProfile>
            <UserProfileBox userProfileBoxProps={rightPlayerProfile} />
          </RightUserProfile>
        </GameInfoLayout>

        {time < 4 && time > 0 ? (
          <PreGamePlayCanvasLayout
            width={theme.canvasImgProps.width}
            height={theme.canvasImgProps.height}
          >
            <ReadCountLayout>
              {userData.id === gameInfo?.leftPlayer.id ||
              userData.id === gameInfo?.rightPlayer.id ? (
                <ReadCount>{time}</ReadCount>
              ) : (
                <ReadyCount>READY</ReadyCount>
              )}
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
              diameter={theme.ballProps.diameter * ballMode}
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
      {(userData.id === gameInfo?.leftPlayer.id ||
        userData.id === gameInfo?.rightPlayer.id) && (
        <HowToUseLayout>
          <Typography color={'grey'} fontSize={'3vh'}>
            ⇧ : Arrow Key UP
          </Typography>
          <Typography color={'grey'} fontSize={'3vh'}>
            ⇩ : Arrow Key DOWN
          </Typography>
        </HowToUseLayout>
      )}
      <GameResultModal
        open={open}
        setOpen={setOpen}
        score={score}
        gameInfo={gameInfo}
        abstention={abstention}
      />
    </GameWindowLayout>
  );
}

export default GamePlayWindowOrganism;
