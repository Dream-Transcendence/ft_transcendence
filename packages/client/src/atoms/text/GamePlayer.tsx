import styled from '@emotion/styled';

const GamePlayerLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  backgroundColor: '#00000000',
  alignContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  flexWrap: 'wrap',
  height: '100%',
  padding: '3px',
}));

function GamePlayer(player: String) {
  return (
    <GamePlayerLayout>
      <text>{player}</text>
    </GamePlayerLayout>
  );
}

export default GamePlayer;
