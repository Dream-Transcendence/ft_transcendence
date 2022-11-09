import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import TextBox from '../../texts/TextBox';

interface TitleProps {
  image: string;
}

const UserProfileBoxLayout = styled(Button)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  textAlign: 'start',
  width: '90%',
  padding: 0,
}));

function ProfileChatRoomBox({ image }: TitleProps) {
  return (
    <UserProfileBoxLayout>
      <Avatar alt="Remy Sharp" src={image} />
      <TextBox value={'Remy'} size={'1rem'} fontColor={'black'} />
    </UserProfileBoxLayout>
  );
}

export default ProfileChatRoomBox;
