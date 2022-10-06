import styled from '@emotion/styled';
import UserProfileBox from '../../molecules/ProfileSection/UserProfileBox';
import ListGenerate from '../../atoms/list/ListGenerate';
import OneMatchHistory from '../../molecules/ProfileSection/OneMatchHistory';
import { Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { reqUserDataAtom } from '../../pages/PingpongRoutePage';
import { useEffect, useState } from 'react';

const MatchHistoryLayout = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'start',
  justifySelf: 'start',
  alignItems: 'center',
  height: '100%',
  width: '60%',
  gridArea: 'MatchHistory',
  backgroundColor: '#1976D2',
  border: 'solid 1px',
}));

const TextLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '8%',
  borderBottom: 'solid 1px',
}));

const ListLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '92%',
}));

const OneMatchHistoryLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignSelf: 'start',
  justifySelf: 'start',
}));

export interface UserMatchHistory {
  id: number,
  opponent: string,
  isWin: boolean,
  isLadder: boolean,
}

function MatchHistory() {
  const reqUser = useRecoilValue(reqUserDataAtom);
  const [userMatchHistory, setUserMatchHistory] = useState<UserMatchHistory>({
    id: 0,
    opponent: "UnKnown",
    isWin: true,
    isLadder: true,
  })
  useEffect(() => {
    // async function getUserLadder() {
    //   const response = await axios.get(`${SERVERURL}/user/${reqUser.id}/game/ladder`);
    //   console.log('user ladder : ', response.data);
    //   return response.data;
    // }
    const response = {
      id: 1,
      opponent: "doyun",
      isWin: true,
      isLadder: true,
    }
    try {
      setUserMatchHistory(response)
    } catch {
      console.log('error : userMatchHistory');
    }
  })

  return (
    <MatchHistoryLayout>
      <TextLayout>
        <Typography variant="h6" align="center">
          MatchHistory
        </Typography>
      </TextLayout>
      <ListLayout>
        <OneMatchHistoryLayout>
          <ListGenerate element={<OneMatchHistory matchHistory={userMatchHistory} />} />
        </OneMatchHistoryLayout>
      </ListLayout>
    </MatchHistoryLayout>
  );
}

export default MatchHistory;
