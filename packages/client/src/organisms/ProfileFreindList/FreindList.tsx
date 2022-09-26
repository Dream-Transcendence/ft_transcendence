import styled from '@emotion/styled';
import UserProfileBox from '../../molecules/ProfileSection/UserProfileBox';
import * as React from 'react';
import ListGenerate from '../../atoms/list/ListGenerate';
import { Typography } from '@mui/material';

const FreindListLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'start',
  justifySelf: 'end',
  alignItems: 'center',
  height: '75%',
  width: '50%',
  gridArea: 'FreindList',
  backgroundColor: '#1976D2',
  border: 'solid 1px',
}));

const TextLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '10%',
  borderBottom: 'solid 1px',
}));

const ListLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '90%',

}));

const ProfileBoxLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  alignSelf: 'start',
  justifySelf: 'start',
  borderBottom: 'solid 1px',
}));


function FreindListOrganisms() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return (
    <FreindListLayout>
      <TextLayout>
        <Typography variant='h6' align="center">freind list</Typography>
      </TextLayout>
      <ListLayout>
        <ListGenerate element={
          <ProfileBoxLayout>
            <UserProfileBox isButton={true} avatarType='circle' />
          </ProfileBoxLayout>
        } />
      </ListLayout>
    </FreindListLayout>
  );
}

export default FreindListOrganisms;
