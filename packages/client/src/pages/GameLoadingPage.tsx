import styled from '@emotion/styled';
import TextBox from '../texts/TextBox';
import { LinkTextResource } from '../types/Link.type';
import HistoryBackTextButton from '../atoms/button/linkPage/HistoryBackTextButton';
import { useNavigate } from 'react-router-dom';
import useSocket from '../socket/useSocket';
import {
  ALREADYFORMATCH,
  GAMECANCLE,
  gameLadderMatch,
  gameNameSpace,
} from '../socket/event';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { CHATROOMURL, GAMEPLAYURL, PROFILEURL } from '../configs/Link.url';
import { gameInfoPropsType, GameRoomDto } from '../types/Game.type';
import { gameTypeAtom, userSecondAuth } from '../recoil/user.recoil';
import { userDataAtom } from '../recoil/user.recoil';
import { LADDER, CUSTOM } from '../configs/Game.type';
import { gameModeAtom } from '../recoil/game.recoil';
import { UserSecondAuth } from '../types/Profile.type';
import { Typography } from '@mui/material';

const GameLodingLayout = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(to bottom right, #76aef1, #f796c0)',
  border: 'none',
  height: '100%',
  width: '100%',
}));

const LodingImageLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100%',
  height: '90%',
}));

const BottomLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'end',
  width: '100%',
  height: '3.5%',
}));

const ButtonLayout = styled('div')(({ theme }) => ({
  background: '#0E359B',
}));

function GameLoadingPage(props: { gameInfoProps: gameInfoPropsType }) {
  const { value: gameInfo, setter: setGameInfo } = props.gameInfoProps;
  const [socket] = useSocket(gameNameSpace);
  const { id: userId } = useRecoilValue(userDataAtom);
  const gameType = useRecoilValue(gameTypeAtom);
  const navigate = useNavigate();
  const gameMode = useRecoilValue(gameModeAtom);
  const userData = useRecoilValue(userDataAtom);
  const passSecondOauth = useRecoilValue<UserSecondAuth>(userSecondAuth);

  useEffect(() => {
    //정상적인 접근인지 판단하는 로직
    if (userData.id === 0 || passSecondOauth.checkIsValid === false)
      navigate('/');
  }, [userData.id, passSecondOauth, navigate]);

  useEffect(() => {
    // connect(); //game namespace socket 연결
    //ladder 일때
    console.log('gametype: ', gameType);
    if (gameType === LADDER) {
      console.log('before emit');
      socket.emit(
        `${gameLadderMatch}`,
        {
          userId: userId,
          mode: gameMode,
        },
        (response: any) => {
          console.log('match emit 성공 : ', response);
        },
      );
    } else if (gameType === CUSTOM) {
      //1:1일때
      socket.emit(
        `${gameLadderMatch}`,
        {
          userId: userId,
          mode: gameMode,
        },
        (response: any) => {
          console.log('match emit 성공 : ', response);
        },
      );
    }
    return () => {
      socket.emit(GAMECANCLE, {
        useId: userId,
        onGame: false,
      });
      console.log('match cancel!');
      socket.off(GAMECANCLE); //모든 리스너 제거
    };
  }, []);

  //match 성공시 값 받아서 동작시켜야함
  useEffect(() => {
    socket.on(ALREADYFORMATCH, (response: GameRoomDto) => {
      setGameInfo(response);
      navigate(`${GAMEPLAYURL}/${response.title}`);
    });
    return () => {
      socket.off(ALREADYFORMATCH);
    };
  }, []);

  //게임 취소 로직 이어 구현하기
  // socket.on(`${gameCancel}`)
  //GameRoomDto로 수정 예정
  useEffect(() => {
    socket.on('exception', (response: any) => {
      alert(response.message);
      console.log('게임 에러', response);
    });
    return () => {
      socket.off('exception');
    };
  }, []);

  const buttonStyle = {
    background: 'linear-gradient(to bottom right, #f796c0, #76aef1)',
    border: 'none',
  };

  return (
    <GameLodingLayout>
      {/* [axios GET 요청] 게임 큐 체크? */}
      {/* [axios POST 요청] 매칭 성공 시, 게임 방 생성요청 */}
      {/* [SocketIO 요청] 게임 큐 체크? */}
      <LodingImageLayout>
        <Typography
          sx={{
            fontSize: '5vh',
            top: '20%',
            fontSizeAdjust: 'from-font',
            position: 'absolute',
            zIndex: '3',
            color: 'white',
          }}
        >
          상대방을 기다리는 중입니다.
        </Typography>
        <Typography
          sx={{
            fontSize: '50vh',
            top: '25%',
            fontSizeAdjust: 'from-font',
            position: 'absolute',
            zIndex: '3',
          }}
        >
          🏓
        </Typography>
      </LodingImageLayout>
      <BottomLayout>
        <ButtonLayout>
          {/*배경색 주기 위함*/}
          <HistoryBackTextButton backgroundColor="#76aef1" border="none" />
        </ButtonLayout>
      </BottomLayout>
    </GameLodingLayout>
  );
}

export default GameLoadingPage;
