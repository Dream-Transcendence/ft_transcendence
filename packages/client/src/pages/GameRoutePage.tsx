import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PROFILEURL } from '../configs/Link.url';
import { gameNameSpace } from '../socket/event';
import useSocket from '../socket/useSocket';
import GameCreatePage from './GameCreatePage';
import GameLoadingPage from './GameLoadingPage';
import GamePlayPage from './GamePlayPage';

function GameRoutePage() {
  const [socket, connect, disconnect] = useSocket(gameNameSpace);
  useEffect(() => {
    function connectGameSocket() {
      connect();
    }
    connectGameSocket();

    return () => {
      disconnect();
    };
  }, []);

  return (
    <Routes>
      <Route path="create/*" element={<GameCreatePage />} />
      <Route path="play/" element={<Navigate replace to={PROFILEURL} />} />
      <Route path="play/:title" element={<GamePlayPage />} />
      <Route path="loading/*" element={<GameLoadingPage />} />
    </Routes>
  );
}

export default GameRoutePage;
