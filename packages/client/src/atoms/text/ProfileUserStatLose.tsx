import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const StatLoseLayout = styled('div')(({ theme }) => ({
  width: '50%',
  height: '100%',
}));

const PointLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  marginTop: '-10%',
  marginLeft: '13%',
  width: '50%',
  height: '100%',
}));

function UserStatLose(props: { value: number }) {
  const { value } = props;
  return (
    <StatLoseLayout>
      <Typography variant="h6">StatLose : </Typography>
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
