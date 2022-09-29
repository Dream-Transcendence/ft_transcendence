import styled from '@emotion/styled';
import UserProfileBox from '../../molecules/ProfileSection/UserProfileBox';
import * as React from 'react';
import ListGenerate from '../../atoms/list/ListGenerate';
import { Typography } from '@mui/material';
import { LinkComponentResource, LinkIconResource } from '../../types/Link.type';
import LinkPageIconButton from '../../atoms/button/linkPage/LinkPageIconButton';
import { Link } from 'react-router-dom';
import LinkPageComponentButton from '../../atoms/button/linkPage/LinkPageComponentButton';
import { OTHERPROFILEURL } from '../../configs/Link.url';

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
  width: '100%',
  borderBottom: 'solid 1px',
  borderColor: 'black',
}));

function FreindListOrganisms() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const OtherProfile: LinkComponentResource = {
    url: OTHERPROFILEURL,
    component:
      <ProfileBoxLayout>
        <UserProfileBox isButton={true} avatarType='circle' />
      </ProfileBoxLayout>
  };

  return (
    <FreindListLayout>
      <TextLayout>
        <Typography variant='h6' align="center">freind list</Typography>
      </TextLayout>
      <ListLayout>
        <ListGenerate element={
          <LinkPageComponentButton LinkComponentResource={OtherProfile} />
        } />
      </ListLayout>
    </FreindListLayout>
  );
}

export default FreindListOrganisms;
