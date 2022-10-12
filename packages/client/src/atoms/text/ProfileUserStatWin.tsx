import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const StatWinLayout = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  flexGrow: '1',
  width: '50%',
  height: '100%',
  border: 'solid 1px',
}));

function UserStatWin(props: { value: number }) {
  const { value } = props;
  return <StatWinLayout>
    <Typography alignItems={'center'} justifyContent={'center'} variant='h6'>
      StatWin : {value}
    </Typography>
  </StatWinLayout >;
}

export default UserStatWin;
