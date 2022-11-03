import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { PhotoSizeSelectLargeSharp } from '@mui/icons-material';
import { createTheme, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import GamePlayer from '../../atoms/text/GamePlayer';
import MatchType from '../../atoms/text/MatchType';
import { userDataAtom } from '../../recoil/user.recoil';
import {
  BaseUserProfileData,
  UserMatchHistoryType,
} from '../../types/Profile.type';
const OneMatchLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  // margin: '1rem',
  margin: 0,
}));

const OneMatchHistoryLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'nowrap',
  width: '98%',
  height: '95%',
  borderRadius: '1rem',
  overflow: 'hidden',
  marginLeft: '10%',
  // margin: '1rem',
  margin: 0,
}));

const PlayerInfoLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  marginLeft: '7%',
  justifyContent: 'center',
}));

function OneMatchHistory(props: { matchHistory: UserMatchHistoryType }) {
  const userData = useRecoilValue<BaseUserProfileData>(userDataAtom);
  const { opponent, isWin, isLadder } = props.matchHistory;
  return (
    <OneMatchLayout>
      <OneMatchHistoryLayout
        style={{
          background: isWin
            ? 'linear-gradient(45deg,rgba(188,110,255,1) 0%,rgba(0,221,255,1) 180%)'
            : 'linear-gradient(135deg, #ffb99f 0%, #f58d88 120%)',
        }}
      >
        {MatchType(isLadder)}
        <PlayerInfoLayout>
          {GamePlayer(userData.nickname)}
          <Typography>VS</Typography>
          {GamePlayer(opponent.nickname)}
        </PlayerInfoLayout>
      </OneMatchHistoryLayout>
    </OneMatchLayout>
  );
}

export default OneMatchHistory;
