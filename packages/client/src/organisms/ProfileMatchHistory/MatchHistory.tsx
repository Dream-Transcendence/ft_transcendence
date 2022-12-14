import styled from '@emotion/styled';
import OneMatchHistory from '../../molecules/ProfileSection/OneMatchHistory';
import { Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  BaseUserProfileData,
  UserMatchHistoryType,
} from '../../types/Profile.type';
import {
  ListGenerateLayout,
  ListLayout,
  ListUlLayout,
} from '../../atoms/list/styles/ListStylesCSS';
import { userDataAtom } from '../../recoil/user.recoil';

const MatchHistoryLayout = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'start',
  justifySelf: 'start',
  alignItems: 'center',
  height: '95%',
  width: '77%',
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
  const userData = useRecoilValue<BaseUserProfileData>(userDataAtom);
  const [matchHistoryList, setMatchHistoryList] = useState<
    UserMatchHistoryType[]
  >([]);

  useEffect(() => {
    async function getUserLadder() {
      await axios
        .get(`${process.env.REACT_APP_SERVER_URL}/users/${userId}/game/records`)
        .then((response) => {
          const history: UserMatchHistoryType[] = response.data;
          setMatchHistoryList(history);
        })
        .catch((error) => {
          // alert(error);
        });
    }
    getUserLadder();
  }, [userId, userData]);

  //userId로 받아온 리스트
  const listElement: JSX.Element[] = matchHistoryList.map(
    (matchHistory, index) => {
      return (
        <ListLayout key={index} sx={{ justifyContent: 'center' }}>
          <OneMatchHistory matchHistory={matchHistory} />
        </ListLayout>
      );
    },
  );

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
          height: '88%',
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
