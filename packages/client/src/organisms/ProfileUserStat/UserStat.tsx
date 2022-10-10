import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import UserStatLadder from '../../atoms/text/ProfileUserStatLadder';
import { SERVERURL } from '../../configs/Link.url';
import UserStatResult from '../../molecules/ProfileSection/StatResult';

const UserStatLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  alignContent: 'wrap',
  alignSelf: 'end',
  alignItems: 'center', //내부 아이템이라고 생각하는 문자열이 좌측 상단 정렬 되어 있는 이유를 모르겠음
  justifySelf: 'start',
  height: '30%',
  width: '65%',
  gridArea: 'UserStat',
  backgroundColor: '#1976D2',
}));

const StatLadder = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  alignItems: 'center', //내부 아이템이라고 생각하는 문자열이 좌측 상단 정렬 되어 있는 이유를 모르겠음
  paddingLeft: '3%',
  width: '30%',
  height: '100%',
  border: 'solid 1px',
}));

function UserStat() {
  const [userLadder, setUserLadder] = useState({
    rank: '',
    winCount: 0,
    loseCount: 0,
  });
  useEffect(() => {
    // async function getUserLadder() {
    //   const response = await axios.get(`${SERVERURL}/user/${reqUser.id}/game/ladder`);
    //   console.log('user ladder : ', response.data);
    //   return response.data;
    // }
    const response = {
      rank: '🦁',
      winCount: 100,
      loseCount: 3,
    };
    try {
      setUserLadder(response);
    } catch {
      console.log('error : userStat');
    }
  }, []);
  return (
    <UserStatLayout>
      <UserStatLadder value={userLadder.rank} />
      <UserStatResult userLadder={userLadder} />
    </UserStatLayout>
  );
}

export default UserStat;
