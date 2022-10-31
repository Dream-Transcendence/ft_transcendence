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
  borderRadius: '7%',
  background:
    'linear-gradient(135deg,rgba(110,177,255,1) 0%,rgba(118,0,255,1) 120%)',
  boxShadow: '0 15px 35px #00000066',
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
      <ListLayout key={matchHistory.id} sx={{ justifyContent: 'center' }}>
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
      <div
        style={{
          backgroundColor: '#aacdffff',
          width: '90%',
          height: '85%',
          borderRadius: '3%',
        }}
      >
        <ListGenerateLayout>
          <ListUlLayout>{listElement}</ListUlLayout>
        </ListGenerateLayout>
      </div>
    </MatchHistoryLayout>
  );
}

export default MatchHistory;
