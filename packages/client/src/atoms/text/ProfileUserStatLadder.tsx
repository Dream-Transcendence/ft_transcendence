import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const StatLadderLayout = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  flexGrow: '1',
  width: '50%',
  height: '100%',
  border: 'solid 1px',
}));

function UserStatLadder(props: { value: string }) {
  const { value } = props;
  {
    /* [axios GET 요청] 레더 정보 불러오기 */
  }
  return (
    <StatLadderLayout>
      <Typography variant="h3">{value}</Typography>
    </StatLadderLayout>
  );
}

export default UserStatLadder;
