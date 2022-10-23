import { keyframes, styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import UserProfileBox from './UserProfileBox';
import CustomIconButton from '../../atoms/button/icon/CustomIconButtion';
import PersonIcon from '@mui/icons-material/Person';
import BlockIcon from '@mui/icons-material/Block';
import BasicSpeedDial from '../../atoms/SpeedDial/SpeedDial';
import {
  CustomIconProps,
  LinkIconProps,
  LinkIconResource,
} from '../../types/Link.type';
import LinkPageIconButton from '../../atoms/button/linkPage/LinkPageIconButton';
import { UserProfileBoxDataType } from '../../types/Profile.type';
import { useRecoilState, useRecoilValue } from 'recoil';
import { PROFILEURL } from '../../configs/Link.url';
import { ADMIN, OWNER } from '../../configs/userType';
import { DMList, userAuth } from '../../recoil/chat.recoil';
import {
  ParticipantInfo,
  ParticipantInfoNState,
} from '../../types/Participant.type';
import { useState } from 'react';
import { BAN, MUTE } from '../../configs/Status.case';
import { BLOCK, UNBLOCK } from '../../configs/Block.case';
import { Rotate90DegreesCcw } from '@mui/icons-material';
import { blockUser, unBlockUser } from '../ChatSection/InfoBoxDMFunction';
import { userDataAtom } from '../../recoil/user.recoil';

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

const UserStateLayout = styled('section')(({ theme }) => ({
  height: '100%',
  width: '40%',
  display: 'flex',
  paddingRight: '10%',
}));

const OwnerBadge = styled('span')(({ theme }) => ({
  marginTop: '1%',
  height: '20px',
  width: '20px',
  position: 'absolute',
  zIndex: '2',
}));

const AdminBadge = styled('span')(({ theme }) => ({
  marginTop: '1%',
  height: '20px',
  width: '20px',
  position: 'absolute',
  zIndex: '2',
}));

const MuteBadge = styled('span')(({ theme }) => ({
  marginTop: '10%',
  width: '20px',
  position: 'absolute',
  zIndex: '2',
}));

const BanBadge = styled('span')(({ theme }) => ({
  marginTop: '11%',
  marginLeft: '72%',
  fontSize: '5px',
  color: 'yellowgreen',
  position: 'absolute',
  zIndex: '1',
}));

const BlockBadge = styled('span')(({ theme }) => ({
  marginTop: '3%',
  marginLeft: '1%',
  height: '40px',
  width: '40px',
  border: 'solid red',
  borderRadius: '100%',
  position: 'absolute',
  backgroundColor: '#f3333355',
  zIndex: '1',
}));

const BlockCloss = styled('span')(({ theme }) => ({
  marginTop: '48%',
  marginLeft: '0%',
  height: '3px',
  width: '40px',
  position: 'absolute',

  transform: 'rotate(-40deg)',
  backgroundColor: '#f33333',
  zIndex: '1',
}));

const SpeedDialLayout = styled('div')((props) => ({
  // display: 'none',
  marginLeft: '20%',
}));

// const [isUser, setIsUser] = useRecoilState(IsUser);

//향후 상태관리를 추가하여 조건에 따라 아이콘을 보이게 또는 안보이게 처리해줄 것 입니다.
function UserChatParticipantsBox(participantInfoNState: ParticipantInfoNState) {
  const { participantInfo, participantInfoArray, handler } =
    participantInfoNState;
  const { user, auth, status, blocked } = participantInfo;
  const userType = useRecoilValue(userAuth);
  const userData = useRecoilValue(userDataAtom);
  const filteredParticipants: ParticipantInfo[] = participantInfoArray.filter(
    (participant) => participant.user.id !== participantInfo.user.id,
  );
  const [roomlist, setRoomList] = useRecoilState(DMList);
  const findRoom = roomlist.find((room) => {
    return room.name === participantInfo.user.nickname;
  });
  const popUserList = roomlist.filter((room) => {
    return room.name !== participantInfo.user.nickname;
  });
  //const isBan = useState();

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

  const setBlock = () => {
    const block = { ...participantInfo, blocked: true };
    if (findRoom !== undefined) {
      const blockedUser = { ...findRoom, blocked: true };
      setRoomList([...popUserList, blockedUser]);
    }
    if (handler !== undefined) handler([...filteredParticipants, block]);
  };
  const setUnBlock = () => {
    const unBlock = { ...participantInfo, blocked: false };
    if (findRoom !== undefined) {
      const blockedUser = { ...findRoom, blocked: false };
      setRoomList([...popUserList, blockedUser]);
    }
    if (handler !== undefined) handler([...filteredParticipants, unBlock]);
  };
  function handlerBlock() {
    if (blocked === UNBLOCK) blockUser(user.id, userData.id, setBlock);
    else if (blocked === BLOCK) unBlockUser(user.id, userData.id, setUnBlock);
  }

  const customProps: CustomIconProps = {
    icon: <BlockIcon />,
    action: handlerBlock,
  };

  return (
    <UserProfileLayout>
      <UserStateLayout>
        {/* 조건에 따라 왕관, 뮤트 , 밴 작업할 것 */}
        {auth === ADMIN && <OwnerBadge>🔮</OwnerBadge>}
        {auth === OWNER && <AdminBadge>👑</AdminBadge>}
        {status === MUTE && <MuteBadge>🔇</MuteBadge>}
        {status === BAN && <BanBadge>BAN</BanBadge>}
        {participantInfo.blocked === BLOCK && (
          <BlockBadge>
            <BlockCloss />
          </BlockBadge>
        )}
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
                <BasicSpeedDial participantInfoNState={participantInfoNState} />
              )}
          </SpeedDialLayout>
        )}
      </UserFuntionLayout>
    </UserProfileLayout>
  );
}

export default UserChatParticipantsBox;
