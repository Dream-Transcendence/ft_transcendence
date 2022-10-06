import styled from '@emotion/styled';
import UserProfileBox from '../../molecules/ProfileSection/UserProfileBox';
import * as React from 'react';
import OneMatchHistory from '../../molecules/ProfileSection/OneMatchHistory';
import { Typography } from '@mui/material';
import ListGenerate from '../../atoms/list/ListGenerate';

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
        <Typography variant="h6" align="center">
          MatchHistory
        </Typography>
      </TextLayout>
      <ListLayout>
        {/* [axios GET 요청] 레더 정보 리스트 불러오기 */}
        <OneMatchHistoryLayout>
          <ListGenerate element={<OneMatchHistory />} />
        </OneMatchHistoryLayout>
      </ListLayout>
    </MatchHistoryLayout>
  );
}

export default MatchHistory;
