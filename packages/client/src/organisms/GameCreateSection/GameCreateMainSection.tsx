import styled from '@emotion/styled';
import GameMapModule from './GameMap';
import GameOptionModule from './GameOption';

const GameCreateMainLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'space-evenly',
  width: '100%',
  height: '100%',
}));

const GameLeftSideLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  width: '36.3%',
  height: '50%',
}));

const GameRightSideLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '35%',
  height: '50%',
}));

function GameCreateMainOrganism() {
  return (
    <GameCreateMainLayout>
      <GameLeftSideLayout>
        <GameMapModule />
      </GameLeftSideLayout>
      <GameRightSideLayout>
        <GameOptionModule />
      </GameRightSideLayout>
    </GameCreateMainLayout>
  );
}

export default GameCreateMainOrganism;
