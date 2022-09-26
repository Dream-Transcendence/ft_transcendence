import styled from '@emotion/styled';

const StatWinLayout = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  flexGrow: '1',
  width: '50%',
  height: '100%',
  border: 'solid 1px',
}));

function UserStatWin() {
  return <StatWinLayout>StatWin</StatWinLayout>;
}

export default UserStatWin;
