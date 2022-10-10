import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import UserProfileBox from './UserProfileBox';
import CustomIconButton from '../../atoms/button/icon/CustomIconButtion';
import PersonIcon from '@mui/icons-material/Person';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import BasicSpeedDial from '../../atoms/SpeedDial/SpeedDial';
import {
  CustomIconProps,
  LinkIconProps,
  LinkIconResource,
} from '../../types/Link.type';
import LinkPageIconButton from '../../atoms/button/linkPage/LinkPageIconButton';
import {
  BaseUserProfileData,
  FriendType,
  UserProfileBoxType,
} from '../../types/Profile.type';
import { useRecoilState, useRecoilValue } from 'recoil';
import { PROFILEURL } from '../../configs/Link.url';

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

const personal: LinkIconResource = {
  url: PROFILEURL,
  icon: <PersonIcon />,
};
const linkPersonal: LinkIconProps = {
  iconResource: personal,
};

const customProps: CustomIconProps = {
  icon: <NotInterestedIcon />,
};

// const [isUser, setIsUser] = useRecoilState(IsUser);

//향후 상태관리를 추가하여 조건에 따라 아이콘을 보이게 또는 안보이게 처리해줄 것 입니다.
function UserChatParticipantsBox() {
  //props: { userData: BaseUserProfileData }) {
  // const { userData } = props;
  const mock: FriendType = {
    id: 0,
    user: {
      id: 0,
      nickname: 'noname',
      image: 'noimage',
    },
    isBlocked: false,
  };
  const userProfileBoxProps: UserProfileBoxType = {
    isButton: true,
    avatarType: 'circle',
    //참가자의 정보를 담고있는 객체 넣어주면 됩니다.
    userData: mock,
    // action: () => {
    //   setIsUser(!isUser);
    // }
  };

  return (
    <UserProfileLayout>
      <UserProfileBox userProfileBoxProps={userProfileBoxProps} />
      <UserFuntionLayout>
        <LinkPageIconButton linkIconProps={linkPersonal} />
        {/* [axios POST 요청] 상대방을 차단 혹은 차단해제가능 */}
        {/* 차단 유무에 따라 아이콘을 다르게 줄 예정 */}
        <CustomIconButton customProps={customProps} />
        {/* admin 권한에 따라 활성/비활성화 */}
        <SpeedDialLayout>
          <BasicSpeedDial />
        </SpeedDialLayout>
      </UserFuntionLayout>
    </UserProfileLayout>
  );
}

export default UserChatParticipantsBox;
