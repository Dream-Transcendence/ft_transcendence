import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const StatWinLayout = styled('div')(({ theme }) => ({
  width: '50%',
  height: '100%',
  marginTop: '2%',
}));

const PointLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  marginLeft: '25%',
  width: '50%',
}));

function UserStatWin(props: { value: number }) {
  const { value } = props;
  return (
    <StatWinLayout>
      <Typography
        display="flex"
        variant="h6"
        alignItems={'center'}
        justifyContent={'center'}
      >
        StatWin
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
