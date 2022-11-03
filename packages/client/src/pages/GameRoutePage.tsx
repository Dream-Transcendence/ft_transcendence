import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CUSTOM, LADDER } from '../configs/Game.type';
import {
  GAMECREATEURL,
  GAMELOADINGURL,
  GAMEPLAYURL,
  NOTFOUNDURL,
  PROFILEURL,
} from '../configs/Link.url';
import { gameInfoAtom } from '../recoil/game.recoil';
import {
  gameTypeAtom,
  userDataAtom,
  userSecondAuth,
} from '../recoil/user.recoil';
import {
  ALREADYFORMATCH,
  GAMECANCEL,
  GAMEMATCH,
  gameNameSpace,
} from '../socket/event';
import useSocket from '../socket/useSocket';
import { gameInfoPropsType, GameRoomDto } from '../types/Game.type';
import { UserSecondAuth } from '../types/Profile.type';
import GameCreatePage from './GameCreatePage';
import GameLoadingPage from './GameLoadingPage';
import GamePlayPage from './GamePlayPage';
import { useLocation } from 'react-router-dom';

function GameRoutePage() {
  const [socket, connect, disconnect] = useSocket(gameNameSpace);
  const userData = useRecoilValue(userDataAtom);
  const navigate = useNavigate();
  const passSecondOauth = useRecoilValue<UserSecondAuth>(userSecondAuth);
  const [gameInfo, setGameInfo] = useRecoilState(gameInfoAtom);
  let location = useLocation();

  useEffect(() => {
    //정상적인 접근인지 판단하는 로직
    if (userData.id === 0 || passSecondOauth.checkIsValid === false)
      navigate('/');
  }, [userData.id, passSecondOauth, navigate]);

  useEffect(() => {
    function connectGameSocket() {
      connect();
      console.log('game socket 연결');
    }
    if (socket.connected === false) connectGameSocket();
    return () => {
      disconnect();
    };
  }, []);

  return (
    <Routes>
      <Route path="create" element={<GameCreatePage />} />
      <Route path="create/*" element={<Navigate replace to={NOTFOUNDURL} />} />
      <Route path="play/" element={<Navigate replace to={NOTFOUNDURL} />} />
      <Route path="play/:urlTitle" element={<GamePlayPage />} />
      <Route path="loading" element={<GameLoadingPage />} />
      <Route path="loading/*" element={<Navigate replace to={NOTFOUNDURL} />} />
      <Route path="/*" element={<Navigate replace to={NOTFOUNDURL} />} />
    </Routes>
  );
}

export default GameRoutePage;
