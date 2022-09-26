import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import UserProfileBox from './UserProfileBox';
import CustomIconButton from '../../atoms/button/icon/CustomIconButtion';
import PersonIcon from '@mui/icons-material/Person';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import BasicSpeedDial from '../../atoms/SpeedDial/SpeedDial';

const UserProfileLayout = styled(Badge)(({ theme }) => ({
  marginLeft: '4%',
  display: 'flex',
  justifyContent: 'space-between',
}));

const UserFuntionLayout = styled('div')(({ theme }) => ({
  width: '60%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'row',
  marginLeft: '20%',
}));

const SpeedDialLayout = styled('div')((props) => ({
  // display: 'none',
  marginLeft: '20%',
}));
//향후 상태관리를 추가하여 조건에 따라 아이콘을 보이게 또는 안보이게 처리해줄 것 입니다.
function UserChatParticipantsBox() {
  return (
    <UserProfileLayout>
      <UserProfileBox isButton={true} avatarType='circle' />

      <UserFuntionLayout>
        <CustomIconButton element={<PersonIcon />} />
        <CustomIconButton element={<NotInterestedIcon />} />
        <SpeedDialLayout>
          <BasicSpeedDial />
        </SpeedDialLayout>
      </UserFuntionLayout>
    </UserProfileLayout>
  );
}

export default UserChatParticipantsBox;
