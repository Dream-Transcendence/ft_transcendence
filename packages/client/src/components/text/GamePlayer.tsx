import styled from '@emotion/styled';

const GamePlayerLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  backgroundColor: '#00000000',
  alignContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  flexWrap: 'wrap',
  flexGrow: 1,
  height: '100%',
}));

function GamePlayer(player: String) {
  return (
    <GamePlayerLayout>
      <text>{player}</text>
    </GamePlayerLayout>
  );
}

export default GamePlayer;
