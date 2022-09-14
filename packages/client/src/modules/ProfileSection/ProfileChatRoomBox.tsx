import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import UserProfileBoxNickname from '../../atoms/ProfileBoxNickname';

interface TitleProps {
  image: string;
}

const UserProfileBoxLayout = styled(Badge)(({ theme }) => ({
  margin: '1px',
  display: 'flex',
  alignItems: 'center',
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
