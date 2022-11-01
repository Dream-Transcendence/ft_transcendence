import styled from '@emotion/styled';
import NavigationBar from '../atoms/bar/NavigationBar';
import { EXITGAME, gameNameSpace, GAMESTART } from '../socket/event';
import useSocket from '../socket/useSocket';
import GameCreateTemplate from '../template/GameCreateSection/GameCreateTemplate';
import GamePlayTemplate from '../template/GameCreateSection/GamePlayTemplate';
import { gameInfoPropsType } from '../types/Game.type';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userDataAtom, userSecondAuth } from '../recoil/user.recoil';
import { useNavigate, useParams } from 'react-router-dom';
import { UserSecondAuth } from '../types/Profile.type';
import { gameInfoAtom } from '../recoil/game.recoil';
import { Socket } from 'socket.io';
import { PROFILEURL } from '../configs/Link.url';

const GamePlayLayout = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#6BADE2',
  height: '100%',
  width: '100%',
  minHeight: '620px',
  minWidth: '1200px',
}));

const GamePlayTemplateLayout = styled('section')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}));

function GamePlayPage() {
  const userData = useRecoilValue(userDataAtom);
  const navigate = useNavigate();
  const passSecondOauth = useRecoilValue<UserSecondAuth>(userSecondAuth);
  const [gameInfo, setGameInfo] = useRecoilState(gameInfoAtom);
  const [socket, connect, disconnect] = useSocket(gameNameSpace);

  useEffect(() => {
    //정상적인 접근인지 판단하는 로직
    if (userData.id === 0 || passSecondOauth.checkIsValid === false)
      navigate('/');
    else if (gameInfo === undefined) navigate(PROFILEURL);
  }, [userData.id, passSecondOauth, navigate]);

  useEffect(() => {
    /* 비정상적인 네트워크로인한 연결끊김이나 새로고침 될 경우 기권처리 */
    return () => {
      connect();
      socket.emit(`${EXITGAME}`, {
        playerId: userData.id,
        title: gameInfo?.title,
      });
      console.log('game exit!!!!!!!!!!!!!');
      disconnect();
    };
  }, []);

  return (
    <GamePlayLayout>
      <GamePlayTemplateLayout>
        {/* <GameStartButton onClick={handleGameStart}> START </GameStartButton> */}
        {/* [SocketIO 요청] 게임구현 시, socket을 사용하겠지? */}
        <GamePlayTemplate />
      </GamePlayTemplateLayout>
    </GamePlayLayout>
  );
}

export default GamePlayPage;
