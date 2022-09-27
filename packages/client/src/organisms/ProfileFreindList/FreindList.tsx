import styled from '@emotion/styled';
import UserProfileBox from '../../molecules/ProfileSection/UserProfileBox';
import * as React from 'react';
import ListGenerate from '../../atoms/list/ListGenerate';
import { Typography } from '@mui/material';
import { LinkComponentResource, LinkIconResource } from '../../types/Link.type';
import LinkPageIconButton from '../../atoms/button/linkPage/LinkPageIconButton';
import { Link } from 'react-router-dom';
import LinkPageComponentButton from '../../atoms/button/linkPage/LinkPageComponentButton';

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

const ProfileLinkLayout = styled('div')(({ theme }) => ({
  /**
   * display: 'flex', 추가하면 link layout이 줄어듬
   * component에 border 적용되어있으면 underline이 보여지는 현상 발견
   * link underline을 컴포넌트에 적용시키지 않기 위해 추가
   */
  width: '100%',
}));




function FreindListOrganisms() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const OtherProfile: LinkComponentResource = {
    url: '/pingpong/otherprofile',
    component:
      <ProfileLinkLayout>
        <UserProfileBox isButton={true} avatarType='circle' />
      </ProfileLinkLayout>
  };

  return (
    <FreindListLayout>
      <TextLayout>
        <Typography variant='h6' align="center">freind list</Typography>
      </TextLayout>
      <ListLayout>
        <ListGenerate element={
          <ProfileBoxLayout>
            <LinkPageComponentButton LinkComponentResource={OtherProfile} />
          </ProfileBoxLayout>
        } />
      </ListLayout>
    </FreindListLayout>
  );
}

export default FreindListOrganisms;
