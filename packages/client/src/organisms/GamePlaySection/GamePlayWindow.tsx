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
  height: `10%`,
  minHeight: '80px',
}));

const LeftUserProfile = styled('div')(({ theme }) => ({
  width: '2%',
  height: '60%',
  zIndex: '2',
  marginTop: '8%',
  marginRight: '50%',
  position: 'absolute',
}));

const RightUserProfile = styled('div')(({ theme }) => ({
  width: '2%',
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

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    console.log(
      '???? tlte ',
      urlTitle !== gameInfo?.title,
      urlTitle,
      gameInfo?.title,
    );
    if (urlTitle !== gameInfo?.title || gameInfo?.title === undefined)
      navigate(`${NOTFOUNDURL}`);
  }, [urlTitle]);

  useEffect(() => {
    if (gameInfo?.mode === SIZEDOWN) setBallMode(SMALLBALLMODE);
  }, []);

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
      userData.id === gameInfo?.leftPlayer.id ||
      userData.id === gameInfo?.rightPlayer.id
    ) {
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
    }
  }, []);

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

  return (
    <GameWindowLayout>
      <GameLayout>
        <ScoreLayout>
          <LeftUserProfile>
            <UserProfileBox userProfileBoxProps={leftPlayerProfile} />
          </LeftUserProfile>
          {score?.left} : {score?.right}
          <RightUserProfile>
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
