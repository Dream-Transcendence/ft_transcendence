import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import UserProfileBoxNickname from '../../components/avatar/ProfileBoxNickname';
import AvatarWithCricle from '../../components/avatar/AvartarWithCircle';

const UserProfileBoxLayout = styled(Badge)(({ theme }) => ({
  margin: '1px',
  display: 'flex',
  alignItems: 'center',
}));

function UserProfileBox() {
  return (
    <UserProfileBoxLayout>
      <AvatarWithCricle />
      <UserProfileBoxNickname />
    </UserProfileBoxLayout>
  );
}

export default UserProfileBox;
