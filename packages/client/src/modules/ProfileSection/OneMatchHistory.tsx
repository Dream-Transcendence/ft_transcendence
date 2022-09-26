import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { PhotoSizeSelectLargeSharp } from '@mui/icons-material';
import { createTheme } from '@mui/material';
import GamePlayer from '../../atoms/text/GamePlayer';
import MatchType from '../../atoms/text/MatchType';

const OneMatchHistoryLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignSelf: 'center',
  alignContent: 'center',
  alignItems: 'center',
  borderBottom: 'solid 1px',
  width: '100%',
  height: '12%',
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