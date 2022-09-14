import styled from '@emotion/styled';
import UserProfileBox from '../../modules/ProfileSection/UserProfileBox';
import * as React from 'react';
import ListGenerate from '../../components/list/ListGenerate';
import OneMatchHistory from '../../modules/ProfileSection/OneMatchHistory';

const MatchHistoryLayout = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'start',
  justifySelf: 'start',
  alignItems: 'center',
  height: '75%',
  width: '60%',
  gridArea: 'MatchHistory',
  backgroundColor: '#1976D2',
  border: 'solid',
}));

function MatchHistory() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return (
    <MatchHistoryLayout>
      <text>MatchHistory</text>
      {ListGenerate(<OneMatchHistory />)}
    </MatchHistoryLayout>
  );
}

export default MatchHistory;
