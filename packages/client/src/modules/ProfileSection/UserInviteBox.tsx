import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import UserProfileBox from './UserProfileBox';
import CustomIconButton from '../../components/button/icon/CustomIconButtion';
import CancelIcon from '@mui/icons-material/Cancel';

const UserInviteProfileLayout = styled(Badge)(({ theme }) => ({
  margin: '1px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

function UserInviteProfileBox() {
  return (
    <UserInviteProfileLayout>
      <UserProfileBox />
      {CustomIconButton(<CancelIcon />)}
    </UserInviteProfileLayout>
  );
}

export default UserInviteProfileBox;
