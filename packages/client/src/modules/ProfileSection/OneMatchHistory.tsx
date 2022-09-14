import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { createTheme } from '@mui/material';
import GamePlayer from '../../components/text/GamePlayer';
import MatchType from '../../components/text/MatchType';

const OneMatchHistoryLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignSelf: 'center',
  alignContent: 'center',
  alignItems: 'center',
  border: 'solid 1px',
  width: '98%',
  height: '10%',
}));

const GamePlayersLayout = styled('text')(({ theme }) => ({ border: 'solid' }));

const MatchHistoryTheme = createTheme({
  palette: {
    primary: {
      main: '#00FF00',
      contrastText: 'white',
    },
  },
});

function OneMatchHistory() {
  return (
    <ThemeProvider theme={MatchHistoryTheme}>
      <OneMatchHistoryLayout>
        {MatchType('Ladder')}
        {GamePlayer('doyun')}
        <text>VS</text>
        {GamePlayer('junghan')}
      </OneMatchHistoryLayout>
    </ThemeProvider>
  );
}

export default OneMatchHistory;
