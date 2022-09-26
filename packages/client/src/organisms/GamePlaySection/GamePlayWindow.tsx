import styled from '@emotion/styled';
import GameResultModal from '../../molecules/GameSecton/GameResultMadal';

const GameWindowLayout = styled('div')(({ theme }) => ({
  backgroundColor: 'black',
  width: '100%',
  height: '90%',
}));

function GamePlayWindowOrganism() {
  return (
    <GameWindowLayout>
      <GameResultModal />
    </GameWindowLayout>
  );
}

export default GamePlayWindowOrganism;
