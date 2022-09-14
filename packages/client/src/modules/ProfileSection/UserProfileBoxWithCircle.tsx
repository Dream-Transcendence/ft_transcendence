import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import UserProfileBoxNickname from '../../atoms/ProfileBoxNickname';
import ProfileAvatar from '../../atoms/ProfileAvatar';
import UserProfileBox from './UserProfileBox';
import { Box, Button } from '@mui/material';

const ProfileBoxAvatarLayout = styled(Button)(({ theme }) => ({
  display: 'flex', //특정 조건에서 주면 profile box 개별마다 반토막남. 이유는 모르겠움
  width: '100%',
  justifyContent: 'flex-start',
  border: 'solid',
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    //초록 원 이펙트 크기
    '0%': {
      transform: 'scale(.9)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.6)',
      opacity: 0,
    },
  },
}));

function UserProfileBoxWithCircle(isButton: Boolean) {
  return (
    <ProfileBoxAvatarLayout>{ProfileAvatar('circle')}</ProfileBoxAvatarLayout>
  );
}

export default UserProfileBoxWithCircle;