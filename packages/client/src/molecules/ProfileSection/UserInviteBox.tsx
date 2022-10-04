import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import CustomIconButton from '../../atoms/button/icon/CustomIconButtion';
import CancelIcon from '@mui/icons-material/Cancel';
import UserProfileBox from './UserProfileBox';
import { CustomIconProps } from '../../types/Link.type';
import { useRecoilState } from 'recoil';
import { UserProfileBoxTypes } from '../../types/Profile.type';

const UserInviteProfileLayout = styled(Badge)(({ theme }) => ({
  margin: '1px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

function UserInviteProfileBox() {
  const customProps: CustomIconProps = {
    icon: <CancelIcon />,
  };

  const userProfileBoxProps: UserProfileBoxTypes = {
    isButton: true,
    avatarType: 'circle',
    // action: () => {
    //   setIsUser(!isUser);
    // }
  };

  return (
    <UserInviteProfileLayout>
      <UserProfileBox userProfileBoxProps={userProfileBoxProps} />
      <CustomIconButton customProps={customProps} />
    </UserInviteProfileLayout>
  );
}

export default UserInviteProfileBox;
