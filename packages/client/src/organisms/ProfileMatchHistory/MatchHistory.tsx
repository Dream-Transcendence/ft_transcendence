import styled from '@emotion/styled';
import UserProfileBox from '../../molecules/ProfileSection/UserProfileBox';
import ListGenerate from '../../atoms/list/ListGenerate';
import OneMatchHistory from '../../molecules/ProfileSection/OneMatchHistory';
import { Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { reqUserDataAtom } from '../../pages/PingpongRoutePage';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SERVERURL } from 'client/src/configs/Link.url';
import axios from 'axios';
import { UserMatchHistoryType } from '../../types/Profile.type';
import { ListLayout, ListUlLayout } from '../../atoms/list/styles/ListStylesCSS';

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

const OneMatchHistoryLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignSelf: 'start',
  justifySelf: 'start',
}));

function MatchHistory() {
  const { userId } = useParams();
  const [matchHistoryList, setMatchHistoryList] = useState<UserMatchHistoryType[]>([{
    id: 0,
    opponent: "UnKnown",
    isWin: false,
    isLadder: false,
  }])
  // useEffect(() => {
  //   async function getUserLadder() {
  //     const response = await axios.get(`${SERVERURL}/users/${userId}/game/records`);
  //     console.log('user ladder : ', response.data);
  //     setMatchHistoryList(response.data);
  //   }
  //   try {
  //     getUserLadder();
  //   } catch {
  //     console.log('error : userMatchHistory');
  //   }
  // }, [matchHistoryList]);

  const listElement: JSX.Element[] = matchHistoryList.map((matchHistory) => {
    return (
      <ListLayout key={matchHistory.id}>
        <OneMatchHistory matchHistory={matchHistory} />
      </ListLayout>
    )
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
          <ListUlLayout>{listElement}</ListUlLayout>
        </OneMatchHistoryLayout>
      </ListLayout>
    </MatchHistoryLayout>
  );
}

export default MatchHistory;
