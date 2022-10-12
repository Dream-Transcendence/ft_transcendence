import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import CustomIconButton from '../../atoms/button/icon/CustomIconButtion';
import CancelIcon from '@mui/icons-material/Cancel';
import UserProfileBox from './UserProfileBox';
import { CustomIconProps } from '../../types/Link.type';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  BaseUserProfileData,
  FriendType,
  UserProfileBoxDataType,
  UserProfileBoxType,
} from '../../types/Profile.type';

const UserInviteProfileLayout = styled('div')(({ theme }) => ({
  margin: '1px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

function UserInviteProfileBox() {
  //props: { userData: BaseUserProfileData }) {
  //const { userData } = props;
  const userData: UserProfileBoxDataType = {
    nickname: 'noname',
    image: 'noimage',
  };

  const userProfileBoxProps = {
    isButton: true,
    avatarType: 'circle',
    userData: userData,
    // action?: () => void;
  };

  const customProps: CustomIconProps = {
    icon: <CancelIcon />,
  };

  return (
    <UserInviteProfileLayout>
      <UserProfileBox userProfileBoxProps={userProfileBoxProps} />
      <CustomIconButton customProps={customProps} />
    </UserInviteProfileLayout>
  );
}

export default UserInviteProfileBox;
