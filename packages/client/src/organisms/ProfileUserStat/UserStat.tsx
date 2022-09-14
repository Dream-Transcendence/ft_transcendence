import styled from '@emotion/styled';
import UserStatLadder from '../../components/text/ProfileUserStatLadder';
import UserStatResult from '../../modules/ProfileSection/StatResult';

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
  border: 'solid',
}));

function UserStat() {
  return (
    <UserStatLayout>
      <UserStatLadder />
      <UserStatResult />
    </UserStatLayout>
  );
}

export default UserStat;
