import styled from '@emotion/styled';
import { Typography } from '@mui/material';

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
      <Typography>{player}</Typography>
    </GamePlayerLayout>
  );
}

export default GamePlayer;
