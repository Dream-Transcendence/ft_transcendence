import Box from '@mui/material/Box';
import TextBox from '../../atoms/TextBox';

function GameScore(props: { player1Score: string; player2Score: string }) {
  const { player1Score, player2Score } = props;
  return (
    <Box sx={{ display: 'flex' }}>
      <TextBox value={player1Score} size={'5rem'} fontColor={'black'} />
      <TextBox value={':'} size={'5rem'} fontColor={'black'} />
      <TextBox value={player2Score} size={'5rem'} fontColor={'black'} />
    </Box>
  );
}
export default GameScore;
