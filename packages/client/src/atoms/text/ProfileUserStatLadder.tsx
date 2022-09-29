import styled from '@emotion/styled';

const StatLadderLayout = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  flexGrow: '1',
  width: '50%',
  height: '100%',
  border: 'solid 1px',
}));

function UserStatLadder() {
  {
    /* [axios GET 요청] 레더 정보 불러오기 */
  }
  return <StatLadderLayout>🐹</StatLadderLayout>;
}

export default UserStatLadder;
