import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { PhotoSizeSelectLargeSharp } from '@mui/icons-material';
import { createTheme, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import GamePlayer from '../../atoms/text/GamePlayer';
import MatchType from '../../atoms/text/MatchType';
import { userDataAtom } from '../../pages/PingpongRoutePage';
import { BaseUserProfileData, UserMatchHistoryType } from '../../types/Profile.type';

const OneMatchHistoryLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'center',
  border: 'solid 1px',
  width: '97%',
  height: '90%',
  borderRadius: '10%',
  overflow: 'hidden',
  margin: 0,
}));

const PlayerInfoLayout = styled('div')(({theme}) => ({
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  justifyContent: 'space-around',
}));

function OneMatchHistory(props: { matchHistory: UserMatchHistoryType }) {
  const userData = useRecoilValue<BaseUserProfileData>(userDataAtom);
  const { opponent, isWin, isLadder } = props.matchHistory;
  return (
    <OneMatchHistoryLayout
      style={{ backgroundColor: isWin ? 'yellow' : 'green' }}
    >
      <PlayerInfoLayout>
        {MatchType(isLadder)}
        {GamePlayer(userData.nickname)}
        <Typography>VS</Typography>
        {GamePlayer(opponent)}
      </PlayerInfoLayout>
    </OneMatchHistoryLayout>
  );
}

export default OneMatchHistory;
