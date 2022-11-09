import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import useSocket from '../socket/useSocket';
import {
  ALREADYFORMATCH,
  GAMEMATCH,
  gameNameSpace,
  REJECTGAME,
  userNameSpace,
} from '../socket/event';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { GAMEPLAYURL, PROFILEURL } from '../configs/Link.url';
import { GameInviteInfoType, GameRoomDto } from '../types/Game.type';
import { gameTypeAtom, userSecondAuth } from '../recoil/user.recoil';
import { userDataAtom } from '../recoil/user.recoil';
import { LADDER, CUSTOM } from '../configs/Game.type';
import { InviteInfoListType } from '../types/Message.type';
import { inviteInfoListAtom } from '../recoil/common.recoil';
import { gameInfoAtom, gameInviteInfoAtom } from '../recoil/game.recoil';
import { UserSecondAuth } from '../types/Profile.type';
import { Button, Typography } from '@mui/material';

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

function GameLoadingPage() {
  const [gameSocket] = useSocket(gameNameSpace);
  const [userSocket] = useSocket(userNameSpace);
  const setGameInfo = useSetRecoilState(gameInfoAtom);
  const { id: userId } = useRecoilValue(userDataAtom);
  const gameType = useRecoilValue(gameTypeAtom);
  const navigate = useNavigate();
  const userData = useRecoilValue(userDataAtom);
  const passSecondOauth = useRecoilValue<UserSecondAuth>(userSecondAuth);
  const [inviteInfoList, setInviteInfoList] =
    useRecoilState<InviteInfoListType[]>(inviteInfoListAtom);
  const gameInviteInfo = useRecoilValue<GameInviteInfoType>(gameInviteInfoAtom);

  useEffect(() => {
    //정상적인 접근인지 판단하는 로직
    if (userData.id === 0 || passSecondOauth.checkIsValid === false)
      navigate('/');
  }, [userData.id, passSecondOauth, navigate]);

  useEffect(() => {
    //ladder 일때
    if (gameType === LADDER) {
      gameSocket.emit(GAMEMATCH, {
        userId: userId,
        mode: LADDER,
      });
    } else if (gameType === CUSTOM && gameInviteInfo.title.length > 0) {
      gameSocket.emit(GAMEMATCH, {
        title: gameInviteInfo.title,
        userId: userData.id,
        mode: gameInviteInfo.mode,
      });
    }
  }, [gameInviteInfo, gameType]);

  useEffect(() => {
    gameSocket.on(ALREADYFORMATCH, (response: GameRoomDto) => {
      setGameInfo(response);
      navigate(`${GAMEPLAYURL}/${response.title}`);
    });
    return () => {
      gameSocket.off(ALREADYFORMATCH);
    };
  }, []);

  /**
   * 게임 거절 이벤트 받기
   */
  useEffect(() => {
    userSocket.on(REJECTGAME, () => {
      const newMessage: InviteInfoListType = {
        userId: userId,
        message: `상대방이 게임을 거절하였습니다.`,
        type: 'check',
      };
      setInviteInfoList([...inviteInfoList, newMessage]);
      navigate(PROFILEURL);
    });
    return () => {
      userSocket.off(REJECTGAME);
    };
  }, [inviteInfoList, setInviteInfoList, userSocket, navigate, userId]);

  /**
   * 게임 에러 받기
   */
  useEffect(() => {
    gameSocket.on('exception', (response: any) => {
      alert(response.message);
    });
    return () => {
      gameSocket.off('exception');
    };
  }, []);

  const buttonStyle = {
    background: 'linear-gradient(to bottom right, #f796c0, #76aef1)',
    border: 'none',
  };

  return (
    <GameLodingLayout>
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
          <Button
            style={buttonStyle}
            onClick={() => navigate(PROFILEURL)}
            variant="contained"
          >
            취소하기
          </Button>
        </ButtonLayout>
      </BottomLayout>
    </GameLodingLayout>
  );
}

export default GameLoadingPage;
