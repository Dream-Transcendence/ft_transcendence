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
import { UserProfileBoxDataType } from '../../types/Profile.type';
import { useRecoilValue } from 'recoil';
import { PROFILEURL } from '../../configs/Link.url';
import { ADMIN, OWNER } from '../../configs/userType';
import { userDataAtom } from '../../pages/PingpongRoutePage';
import { userAuth } from '../../recoil/chat.recoil';
import { ParticipantInfo } from '../../types/Participant.type';

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

const UserStateLayout = styled('div')(({ theme }) => ({
  height: '100%',
  width: '40%',
  paddingRight: '10%',
}));

const SpeedDialLayout = styled('div')((props) => ({
  // display: 'none',
  marginLeft: '20%',
}));

const customProps: CustomIconProps = {
  icon: <NotInterestedIcon />,
};

// const [isUser, setIsUser] = useRecoilState(IsUser);

//향후 상태관리를 추가하여 조건에 따라 아이콘을 보이게 또는 안보이게 처리해줄 것 입니다.
function UserChatParticipantsBox(props: { participantInfo: ParticipantInfo }) {
  const participantInfo = props.participantInfo;
  const { user, auth } = participantInfo;
  const userType = useRecoilValue(userAuth);
  const userData = useRecoilValue(userDataAtom);
  const userInfo: UserProfileBoxDataType = {
    nickname: user.nickname,
    image: user.image,
  };

  const personal: LinkIconResource = {
    url: `${PROFILEURL}/${user.id}`,
    icon: <PersonIcon />,
  };

  const linkPersonal: LinkIconProps = {
    iconResource: personal,
  };

  const userProfileBoxProps = {
    isButton: false,
    avatarType: 'circle',
    userData: userInfo,
  };
  return (
    <UserProfileLayout>
      <UserStateLayout>
        {/* 조건에 따라 왕관, 뮤트 , 밴 작업할 것 */}
        <UserProfileBox userProfileBoxProps={userProfileBoxProps} />
      </UserStateLayout>
      <UserFuntionLayout>
        <LinkPageIconButton linkIconProps={linkPersonal} />
        {/* [axios POST 요청] 상대방을 차단 혹은 차단해제가능 */}
        {/* 차단 유무에 따라 아이콘을 다르게 줄 예정 */}
        <CustomIconButton customProps={customProps} />
        {/* admin 권한에 따라 활성/비활성화 */}
        {userType !== null && (
          <SpeedDialLayout>
            {auth !== OWNER &&
              userData.id !== user.id &&
              !(userType === ADMIN && auth === ADMIN) && (
                <BasicSpeedDial participantInfo={participantInfo} />
              )}
          </SpeedDialLayout>
        )}
      </UserFuntionLayout>
    </UserProfileLayout>
  );
}

export default UserChatParticipantsBox;
