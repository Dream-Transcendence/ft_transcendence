import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  ListGenerateLayout,
  ListLayout,
  ListUlLayout,
} from '../atoms/list/styles/ListStylesCSS';
import LiveObserveElement from '../molecules/Observe/LiveObserveElement';
import { userDataAtom, userSecondAuth } from '../recoil/user.recoil';
import { gameNameSpace } from '../socket/event';
import useSocket from '../socket/useSocket';
import { GameRoomDto } from '../types/Game.type';
import { UserSecondAuth } from '../types/Profile.type';

const LiveObserveLayout = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#6BADE2',
  minHeight: '1000px',
  height: '100%',
  width: '100%',
  minWidth: '1200px',
}));

const GameListLayout = styled('div')(({ theme }) => ({
  height: '100%',
  width: '80%',

  marginTop: '1%',
}));

function LiveObservePage() {
  const [socket, connect, disconnect] = useSocket(gameNameSpace);
  const userData = useRecoilValue(userDataAtom);
  const [passSecondOauth, setPassSecondOauth] =
    useRecoilState<UserSecondAuth>(userSecondAuth);
  const navigate = useNavigate();
  const mockUp: GameRoomDto[] = [
    {
      title: '',
      leftPlayer: {
        id: 1,
        nickname: '',
        image: '',
      },
      rightPlayer: {
        id: 1,
        nickname: '',
        image: '',
      },
      ballPos: { x: 1, y: 1 },
      paddlePos: { left: 1, right: 2 },
      score: { left: 1, right: 2 },
      mode: 1,
    },
  ];

  useEffect(() => {
    //정상적인 접근인지 판단하는 로직
    if (userData.id === 0 || passSecondOauth.checkIsValid === false)
      navigate('/');
  }, [userData.id, passSecondOauth, navigate]);

  useEffect(() => {
    if (socket.connected === false) connect();
    return () => {
      if (socket.disconnected === false) disconnect();
    };
  }, []);

  const listElement: React.ReactElement[] = mockUp.map(
    (game: GameRoomDto, index: number) => {
      return (
        <ListLayout key={index}>
          <LiveObserveElement gameInfo={game} />
        </ListLayout>
      );
    },
  );

  return (
    <LiveObserveLayout>
      <GameListLayout>
        <ListGenerateLayout>
          <ListUlLayout>{listElement}</ListUlLayout>
        </ListGenerateLayout>
      </GameListLayout>
    </LiveObserveLayout>
  );
}

export default LiveObservePage;
