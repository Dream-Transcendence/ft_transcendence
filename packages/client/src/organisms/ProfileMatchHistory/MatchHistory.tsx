import styled from '@emotion/styled';
import UserProfileBox from '../../modules/ProfileSection/UserProfileBox';
import * as React from 'react';
import ListGenerate from '../../atoms/list/ListGenerate';
import OneMatchHistory from '../../modules/ProfileSection/OneMatchHistory';
import { Typography } from '@mui/material';

const MatchHistoryLayout = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'start',
  justifySelf: 'start',
  alignItems: 'center',
  height: '100%',
  width: '60%',
  gridArea: 'MatchHistory',
  backgroundColor: '#1976D2',
  border: 'solid 1px',
}));


const TextLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '8%',
  borderBottom: 'solid 1px',
}));

const ListLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '92%',

}));

const OneMatchHistoryLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignSelf: 'start',
  justifySelf: 'start',
}));

function MatchHistory() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return (
    <MatchHistoryLayout>
      <TextLayout>
        <Typography variant='h6' align="center">MatchHistory</Typography>
      </TextLayout>
      <ListLayout>
        <OneMatchHistoryLayout>{ListGenerate(<OneMatchHistory />)}</OneMatchHistoryLayout>
      </ListLayout>
    </MatchHistoryLayout>
  );
}

export default MatchHistory;
