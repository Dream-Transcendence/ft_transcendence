import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const StatLadderLayout = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  flexGrow: '1',
  display: 'flex',
  fload: 'right',
  width: '20%',
  height: '100%',
  borderRadius: '7%',
}));

function UserStatLadder(props: { value: string }) {
  const { value } = props;
  {
    /* [axios GET 요청] 레더 정보 불러오기 */
  }
  return (
    <StatLadderLayout>
      <Typography variant="h2">{value}</Typography>
    </StatLadderLayout>
  );
}

export default UserStatLadder;
