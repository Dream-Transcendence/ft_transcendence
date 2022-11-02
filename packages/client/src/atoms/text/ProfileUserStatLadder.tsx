import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { CAT, MOUSE, TIGER } from '../../configs/userType';

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

function UserStatLadder(props: { value: number }) {
  const { value } = props;

  return (
    <StatLadderLayout>
      <Typography variant="h2">
        {value > 10 ? TIGER : value > 5 ? CAT : MOUSE}
      </Typography>
    </StatLadderLayout>
  );
}

export default UserStatLadder;
