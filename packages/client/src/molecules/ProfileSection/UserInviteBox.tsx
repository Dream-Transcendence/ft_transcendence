import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import CustomIconButton from '../../atoms/button/icon/CustomIconButtion';
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
      <UserProfileBox isButton={false} avatarType='circle' />
      <CustomIconButton element={<CancelIcon />} />
    </UserInviteProfileLayout>
  );
}

export default UserInviteProfileBox;
