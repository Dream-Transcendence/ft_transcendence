import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const StatLoseLayout = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  flexGrow: '1',
  width: '50%',
  height: '100%',
  border: 'solid 1px',
}));

function UserStatLose(props: { value: number }) {
  const { value } = props;
  return <StatLoseLayout>
    <Typography variant='h6'>
      StatLose : {value}
    </Typography>  </StatLoseLayout>;
}


export default UserStatLose;
