import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import UserProfileBoxNickname from '../../atoms/ProfileBoxNickname';
import { Button } from '@mui/material';

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
      <UserProfileBoxNickname />
    </UserProfileBoxLayout>
  );
}

export default ProfileChatRoomBox;
