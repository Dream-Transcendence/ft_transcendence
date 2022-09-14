import styled from '@emotion/styled';
import UserProfileBox from '../../modules/ProfileSection/UserProfileBox';

import * as React from 'react';
import List from '@mui/material/List';
import ListGenerate from '../../components/list/ListGenerate';
import UserProfileBoxWithCircle from '../../modules/ProfileSection/UserProfileBoxWithCircle';

const FreindListLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'start',
  justifySelf: 'end',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  height: '75%',
  width: '50%',
  gridArea: 'FreindList',
  backgroundColor: '#1976D2',
  border: 'solid',
}));

function FreindListOrganisms() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return (
    <FreindListLayout>
      <div>freind list</div>
      {ListGenerate(UserProfileBox(true, 'circle'))}
    </FreindListLayout>
  );
}

export default FreindListOrganisms;
