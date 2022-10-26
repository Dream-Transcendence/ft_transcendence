import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { CUSTOM, LADDER } from '../configs/Game.type';
import { PROFILEURL } from '../configs/Link.url';
import { gameTypeAtom, userDataAtom } from '../recoil/user.recoil';
import { ALREADFORMATCH, GAMECANCLE, gameLadderMatch, gameNameSpace } from '../socket/event';
import useSocket from '../socket/useSocket';
import { gameInfoPropsType, GameRoomDto } from '../types/Game.type';
import GameCreatePage from './GameCreatePage';
import GameLoadingPage from './GameLoadingPage';
import GamePlayPage from './GamePlayPage';

function GameRoutePage() {
  const [socket, connect, disconnect] = useSocket(gameNameSpace);
  const [gameInfo, setGameInfo] = useState<GameRoomDto | undefined>();
  const gameInfoProps: gameInfoPropsType = {
    value: gameInfo,
    setter: setGameInfo,
    socket: socket,
  }
  console.log('router',gameInfo);
  useEffect(() => {
    connect();
    console.log('game socket 연결')
    
    return () => {
      disconnect();
      console.log('game socket 해제')
    };
  }, []);

  // useEffect(() => {

  // }, [gameInfo])

  return (
    <Routes>
      <Route path="create/*" element={<GameCreatePage />} />
      <Route path="play/" element={<Navigate replace to={PROFILEURL} />} />
      <Route path="play/:title" element={<GamePlayPage />} />
      <Route path="loading/*" element={<GameLoadingPage gameInfoProps={gameInfoProps}/>} />
    </Routes>
  );
}

export default GameRoutePage;
