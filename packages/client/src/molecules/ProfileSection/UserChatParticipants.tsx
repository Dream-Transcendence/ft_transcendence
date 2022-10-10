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
import { OTHERPROFILEURL } from '../../configs/Link.url';
import { blockUser } from '../ChatSection/InfoBoxDMFunction';

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
//[수정사항] any => ChannelParticipantDto
function UserChatParticipantsBox(props: { participantInfo: any }) {
  const { user, auth, status, blocked } = props.participantInfo;

  const personal: LinkIconResource = {
    url: OTHERPROFILEURL,
    icon: <PersonIcon />,
  };
  const linkPersonal: LinkIconProps = {
    iconResource: personal,
  };

  function handlerBlock() {
    blockUser(user.id);
  }

  const customBlockProps: CustomIconProps = {
    icon: <NotInterestedIcon />,
    action: handlerBlock,
  };

  return (
    <UserProfileLayout>
      <UserProfileBox isButton={true} avatarType="circle" />
      <UserFuntionLayout>
        <LinkPageIconButton linkIconProps={linkPersonal} />
        {/* [axios POST 요청] 상대방을 차단 혹은 차단해제가능 */}
        {/* 차단 유무에 따라 아이콘을 다르게 줄 예정 */}
        <CustomIconButton customProps={customBlockProps} />
        {/* admin 권한에 따라 활성/비활성화 */}
        <SpeedDialLayout>
          <BasicSpeedDial />
        </SpeedDialLayout>
      </UserFuntionLayout>
    </UserProfileLayout>
  );
}

export default UserChatParticipantsBox;
