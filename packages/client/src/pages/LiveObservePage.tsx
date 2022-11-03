import styled from '@emotion/styled';
import { useEffect } from 'react';
import {
  ListGenerateLayout,
  ListLayout,
  ListUlLayout,
} from '../atoms/list/styles/ListStylesCSS';
import LiveObserveElement from '../molecules/Observe/LiveObserveElement';
import { gameNameSpace } from '../socket/event';
import useSocket from '../socket/useSocket';
import { GameRoomDto } from '../types/Game.type';

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
    connect();

    return () => {
      disconnect();
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
