import styled from '@emotion/styled';

const StatLadderLayout = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  flexGrow: '1',
  width: '50%',
  height: '100%',
  border: 'solid 1px',
}));

function UserStatLadder() {
  return <StatLadderLayout>🐹</StatLadderLayout>;
}

export default UserStatLadder;
