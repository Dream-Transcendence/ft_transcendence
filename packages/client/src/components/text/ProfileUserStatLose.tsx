import styled from '@emotion/styled';

const StatLoseLayout = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  flexGrow: '1',
  width: '50%',
  height: '100%',
  border: 'solid 1px',
}));

function UserStatLose() {
  return <StatLoseLayout>StatLose</StatLoseLayout>;
}

export default UserStatLose;
