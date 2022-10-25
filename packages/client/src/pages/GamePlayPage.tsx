import styled from '@emotion/styled';
import NavigationBar from '../atoms/bar/NavigationBar';
import { gameNameSpace, GAMESTART } from '../socket/event';
import useSocket from '../socket/useSocket';
import GameCreateTemplate from '../template/GameCreateSection/GameCreateTemplate';
import GamePlayTemplate from '../template/GameCreateSection/GamePlayTemplate';

const GamePlayLayout = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#6BADE2',
  height: '100%',
  width: '100%',
}));

const GamePlayTemplateLayout = styled('section')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '90%',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}));

const GameStartButton = styled('button')(({ theme }) => ({
  width: '20%',
  height: '20%',
  backgroundColor: 'red',
}));

function GamePlayPage() {
  const [socket] = useSocket(gameNameSpace);
  const gameStart = () => {
    try {
      socket.emit(`${GAMESTART}`, {
        title: '',
      });
    } catch (error) {}
  };
  const handleGameStart = () => {
    //gameStart();
  };

  return (
    <GamePlayLayout>
      <GamePlayTemplateLayout>
        <GameStartButton onClick={handleGameStart} />
        {/* [SocketIO 요청] 게임구현 시, socket을 사용하겠지? */}
        <GamePlayTemplate />
      </GamePlayTemplateLayout>
    </GamePlayLayout>
  );
}

export default GamePlayPage;
