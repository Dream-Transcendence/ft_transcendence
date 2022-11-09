import { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { CUSTOM } from '../configs/Game.type';
import { NOTFOUNDURL } from '../configs/Link.url';
import { gameInviteInfoAtom } from '../recoil/game.recoil';
import {
  gameTypeAtom,
  userDataAtom,
  userSecondAuth,
} from '../recoil/user.recoil';
import { CANCELINVITE, gameNameSpace, userNameSpace } from '../socket/event';
import useSocket from '../socket/useSocket';
import { GameInviteInfoType } from '../types/Game.type';
import { UserSecondAuth } from '../types/Profile.type';
import GameCreatePage from './GameCreatePage';
import GameLoadingPage from './GameLoadingPage';
import GamePlayPage from './GamePlayPage';

function GameRoutePage() {
  const [socket, connect, disconnect] = useSocket(gameNameSpace);
  const [userSocket] = useSocket(userNameSpace);
  const userData = useRecoilValue(userDataAtom);
  const navigate = useNavigate();
  const passSecondOauth = useRecoilValue<UserSecondAuth>(userSecondAuth);
  const setGameInviteInfo =
    useSetRecoilState<GameInviteInfoType>(gameInviteInfoAtom);
  const gameType = useRecoilValue(gameTypeAtom);

  useEffect(() => {
    //정상적인 접근인지 판단하는 로직
    if (userData.id === 0 || passSecondOauth.checkIsValid === false)
      navigate('/');
  }, [userData.id, passSecondOauth, navigate]);

  useEffect(() => {
    function connectGameSocket() {
      connect();
    }
    connectGameSocket();
    return () => {
      if (gameType === CUSTOM) {
        userSocket.emit(CANCELINVITE, {
          hostId: userData.id,
        });
        setGameInviteInfo({
          title: '',
          hostId: 0,
          opponentId: 0,
          mode: CUSTOM, //초대의 mode는 기본 값이 custom입니다.
        });
      }

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
