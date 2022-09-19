import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import CustomIconButton from '../../components/button/icon/CustomIconButtion';
import CancelIcon from '@mui/icons-material/Cancel';
import UserProfileBox from './UserProfileBox';

const UserInviteProfileLayout = styled(Badge)(({ theme }) => ({
  margin: '1px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

function UserInviteProfileBox() {
  return (
    <UserInviteProfileLayout>
      {UserProfileBox(false, 'circle')}
      {CustomIconButton(<CancelIcon />)}
    </UserInviteProfileLayout>
  );
}

export default UserInviteProfileBox;
