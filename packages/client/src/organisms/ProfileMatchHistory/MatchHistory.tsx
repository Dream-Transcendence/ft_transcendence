import styled from '@emotion/styled';
import UserProfileBox from '../../molecules/ProfileSection/UserProfileBox';
import ListGenerate from '../../atoms/list/ListGenerate';
import OneMatchHistory from '../../molecules/ProfileSection/OneMatchHistory';
import { Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UserMatchHistoryType } from '../../types/Profile.type';
import {
  ListGenerateLayout,
  ListLayout,
  ListUlLayout,
} from '../../atoms/list/styles/ListStylesCSS';
import ProfileImage from '../../atoms/profile/ProfileImage';

const MatchHistoryLayout = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'start',
  justifySelf: 'start',
  alignItems: 'center',
  height: '90%',
  width: '60%',
  gridArea: 'MatchHistory',
  backgroundColor: '#1976D2',
  border: 'solid 1px',
}));

const TextLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '8%',
  //borderBottom: 'solid 1px',
}));

function MatchHistory() {
  const { userId } = useParams();
  const [matchHistoryList, setMatchHistoryList] = useState<
    UserMatchHistoryType[]
  >([
    {
      id: Number(userId),
      opponent: 'UnKnown',
      isWin: false,
      isLadder: false,
    },
  ]);

  //userId로 받아온 리스트
  const listElement: JSX.Element[] = matchHistoryList.map((matchHistory) => {
    return (
      <ListLayout key={matchHistory.id}>
        <OneMatchHistory matchHistory={matchHistory} />
      </ListLayout>
    );
  });

  return (
    <MatchHistoryLayout>
      <TextLayout>
        <Typography variant="h6" align="center">
          MatchHistory
        </Typography>
      </TextLayout>
      <div style={{backgroundColor: 'white', width: '90%', height: '90%', borderRadius: '3%'}}>
      <ListGenerateLayout>
        <ListUlLayout>{listElement}</ListUlLayout>
      </ListGenerateLayout>
      </div>
    </MatchHistoryLayout>
  );
}

export default MatchHistory;
