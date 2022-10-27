import styled from '@emotion/styled';
import NavigationBar from '../atoms/bar/NavigationBar';
import { gameNameSpace, GAMESTART } from '../socket/event';
import useSocket from '../socket/useSocket';
import GameCreateTemplate from '../template/GameCreateSection/GameCreateTemplate';
import GamePlayTemplate from '../template/GameCreateSection/GamePlayTemplate';
import { gameInfoPropsType } from '../types/Game.type';
import { useEffect } from 'react';

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

function GamePlayPage(props: { gameInfoProps: gameInfoPropsType }) {
  const gameInfoProps = props.gameInfoProps;
  const [socket] = useSocket(gameNameSpace);

  return (
    <GamePlayLayout>
      <GamePlayTemplateLayout>
        {/* <GameStartButton onClick={handleGameStart}> START </GameStartButton> */}
        {/* [SocketIO 요청] 게임구현 시, socket을 사용하겠지? */}
        <GamePlayTemplate gameInfoProps={gameInfoProps} />
      </GamePlayTemplateLayout>
    </GamePlayLayout>
  );
}

export default GamePlayPage;
