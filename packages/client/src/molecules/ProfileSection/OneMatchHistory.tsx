import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { PhotoSizeSelectLargeSharp } from '@mui/icons-material';
import { createTheme, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import GamePlayer from '../../atoms/text/GamePlayer';
import MatchType from '../../atoms/text/MatchType';
import { userDataAtom } from '../../pages/PingpongRoutePage';
import { UserMatchHistoryType } from '../../types/Profile.type';

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
    secondary: {
      main: '#856801',
      contrastText: 'white',
    }
  },
});

function OneMatchHistory(props: { matchHistory: UserMatchHistoryType }) {
  const userData = useRecoilValue(userDataAtom);
  const { opponent, isWin, isLadder } = props.matchHistory;
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
