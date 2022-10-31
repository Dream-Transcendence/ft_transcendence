import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { CUSTOM, LADDER } from '../configs/Game.type';
import { PROFILEURL } from '../configs/Link.url';
import {
  gameTypeAtom,
  userDataAtom,
  userSecondAuth,
} from '../recoil/user.recoil';
import {
  ALREADYFORMATCH,
  GAMECANCLE,
  GAMEMATCH,
  gameNameSpace,
} from '../socket/event';
import useSocket from '../socket/useSocket';
import { gameInfoPropsType, GameRoomDto } from '../types/Game.type';
import { UserSecondAuth } from '../types/Profile.type';
import GameCreatePage from './GameCreatePage';
import GameLoadingPage from './GameLoadingPage';
import GamePlayPage from './GamePlayPage';

function GameRoutePage() {
  const [socket, connect, disconnect] = useSocket(gameNameSpace);
  const [gameInfo, setGameInfo] = useState<GameRoomDto | undefined>();
  const userData = useRecoilValue(userDataAtom);
  const navigate = useNavigate();
  const passSecondOauth = useRecoilValue<UserSecondAuth>(userSecondAuth);

  useEffect(() => {
    //정상적인 접근인지 판단하는 로직
    if (userData.id === 0 || passSecondOauth.checkIsValid === false)
      navigate('/');
  }, [userData.id, passSecondOauth, navigate]);

  const gameInfoProps: gameInfoPropsType = {
    value: gameInfo,
    setter: setGameInfo,
  };
  useEffect(() => {
    function connectGameSocket() {
      connect();
      console.log('game socket 연결');
    }
    connectGameSocket();

    return () => {
      disconnect();
      console.log('game socket 해제');
    };
  }, []);

  return (
    <Routes>
      <Route path="create/*" element={<GameCreatePage />} />
      <Route path="play/" element={<Navigate replace to={PROFILEURL} />} />
      <Route
        path="play/:title"
        element={<GamePlayPage gameInfoProps={gameInfoProps} />}
      />
      <Route
        path="loading/*"
        element={<GameLoadingPage gameInfoProps={gameInfoProps} />}
      />
    </Routes>
  );
}

export default GameRoutePage;
