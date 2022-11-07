import styled from '@emotion/styled';
import GameOption from '../../molecules/GameSecton/GameOption';

const GameOptionLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'center',
  backgroundColor: '#7777D2',
  overflow: 'hidden',
  width: '80%',
  height: '55%',
}));

function GameOptionModule() {
  return (
    <GameOptionLayout>
      <GameOption />
    </GameOptionLayout>
  );
}

export default GameOptionModule;
