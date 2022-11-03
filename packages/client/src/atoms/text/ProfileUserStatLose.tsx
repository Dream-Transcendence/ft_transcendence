import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const StatLoseLayout = styled('div')(({ theme }) => ({
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

function UserStatLose(props: { value: number }) {
  const { value } = props;
  return (
    <StatLoseLayout>
      <Typography
        display="flex"
        variant="h6"
        alignItems={'center'}
        justifyContent={'center'}
      >
        StatLose
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
    </StatLoseLayout>
  );
}

export default UserStatLose;
