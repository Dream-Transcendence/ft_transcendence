import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const StatWinLayout = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  flexGrow: '1',
  width: '50%',
  height: '100%',
}));

const PointLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  marginTop: '-10%',
  marginLeft: '10%',
  width: '50%',
  height: '100%',
}));

function UserStatWin(props: { value: number }) {
  const { value } = props;
  return (
    <StatWinLayout>
      <Typography alignItems={'center'} justifyContent={'center'} variant="h6">
        StatWin :
      </Typography>
      <PointLayout>
        <Typography
          alignItems={'center'}
          justifyContent={'center'}
          variant="h4"
          color={'whitesmoke'}
        >
          {value}
        </Typography>
      </PointLayout>
    </StatWinLayout>
  );
}

export default UserStatWin;
