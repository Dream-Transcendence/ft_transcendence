import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { PhotoSizeSelectLargeSharp } from '@mui/icons-material';
import { createTheme, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import GamePlayer from '../../atoms/text/GamePlayer';
import MatchType from '../../atoms/text/MatchType';
import { UserMatchHistory } from '../../organisms/ProfileMatchHistory/MatchHistory';
import { userDataAtom } from '../../pages/PingpongRoutePage';

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

const GamePlayersLayout = styled('span')(({ theme }) => ({ border: 'solid' }));

const MatchHistoryTheme = createTheme({
  palette: {
    primary: {
      main: '#00FF00',
      contrastText: 'white',
    },
  },
});

function OneMatchHistory(props: { matchHistory: UserMatchHistory }) {
  const userData = useRecoilValue(userDataAtom);
  const { id, opponent, isWin, isLadder } = props.matchHistory;
  return (
    <ThemeProvider theme={MatchHistoryTheme}>
      <OneMatchHistoryLayout>
        {MatchType(isLadder)}
        {GamePlayer(userData.nickname)}
        <Typography>VS</Typography>
        {GamePlayer(opponent)}
      </OneMatchHistoryLayout>
    </ThemeProvider>
  );
}

export default OneMatchHistory;
