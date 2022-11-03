import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import UserStatLadder from '../../atoms/text/ProfileUserStatLadder';
import { SERVERURL } from '../../configs/Link.url';
import UserStatResult from '../../molecules/ProfileSection/StatResult';
import { UserLadderType } from '../../types/Profile.type';

const UserStatLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  alignContent: 'wrap',
  overflow: 'hidden',
  alignSelf: 'end',
  alignItems: 'center', //내부 아이템이라고 생각하는 문자열이 좌측 상단 정렬 되어 있는 이유를 모르겠음
  justifySelf: 'start',
  height: '30%',
  width: '73%',
  gridArea: 'UserStat',
  borderRadius: '7%',
  border: 'solid 10px #00000000',
  background:
    'linear-gradient(135deg,rgba(110,177,255,1) 0%,rgba(118,0,255,1) 120%)',
  boxShadow: '0 15px 35px #00000066',
}));

const StatLadder = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  alignItems: 'center', //내부 아이템이라고 생각하는 문자열이 좌측 상단 정렬 되어 있는 이유를 모르겠음
  paddingLeft: '3%',
  width: '30%',
  height: '100%',
}));

function UserStat() {
  const { userId } = useParams();
  const [userLadder, setUserLadder] = useState<UserLadderType>({
    rank: 0,
    winCount: 0,
    loseCount: 0,
  });

  useEffect(() => {
    async function getUserLadder() {
      await axios
        .get(`${SERVERURL}/users/${userId}/game/ladder`)
        .then((response) => {
          const stat: UserLadderType = response.data;
          setUserLadder(stat);
        })
        .catch((error) => {
          alert(error);
          console.log(error);
        });
    }
    getUserLadder();
  }, [userId]);

  return (
    <UserStatLayout>
      <UserStatLadder value={userLadder.rank} />
      <UserStatResult userLadder={userLadder} />
    </UserStatLayout>
  );
}

export default UserStat;
