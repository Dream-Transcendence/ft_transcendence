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
  const mock: FriendType = {
    id: 0,
    user: {
      id: 0,
      nickname: 'noname',
      image: 'noimage',
    },
    isBlocked: false,
  };
  const customProps: CustomIconProps = {
    icon: <CancelIcon />,
  };

  const userProfileBoxProps: UserProfileBoxType = {
    isButton: true,
    avatarType: 'circle',
    userData: mock,
  };

  return (
    <UserInviteProfileLayout>
      <UserProfileBox userProfileBoxProps={userProfileBoxProps} />
      <CustomIconButton customProps={customProps} />
    </UserInviteProfileLayout>
  );
}

export default UserInviteProfileBox;
