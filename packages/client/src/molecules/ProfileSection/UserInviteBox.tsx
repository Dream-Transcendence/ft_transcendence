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
  UserProfileBoxType,
} from '../../types/Profile.type';
import { reqUserAtom } from '../../pages/PingpongRoutePage';

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

  const reqUser = useRecoilValue<BaseUserProfileData>(reqUserAtom);
  const changeSpot = () => {};

  const userProfileBoxProps: UserProfileBoxType = {
    isButton: true,
    avatarType: 'circle',
    userData: reqUser,
    action: changeSpot,
  };

  return (
    <UserInviteProfileLayout>
      <UserProfileBox userProfileBoxProps={userProfileBoxProps} />
      <CustomIconButton customProps={customProps} />
    </UserInviteProfileLayout>
  );
}

export default UserInviteProfileBox;
