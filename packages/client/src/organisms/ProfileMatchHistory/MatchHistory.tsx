import styled from '@emotion/styled';

const MatchHistoryLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '85%',
  width: '60%',
  gridArea: 'MatchHistory',
  backgroundColor: '#1976D2',
}));

const UserPicture = styled('div')(({ theme }) => ({
  height: '60%',
}));

const UserNickname = styled('div')(({ theme }) => ({
  height: '20%',
}));

const SecondAuth = styled('div')(({ theme }) => ({
  height: '20%',
}));

function MatchHistory() {
  return <MatchHistoryLayout>Match History</MatchHistoryLayout>;
}

export default MatchHistory;
