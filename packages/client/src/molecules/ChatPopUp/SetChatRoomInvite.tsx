import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchBox from '../../atoms/input/SearchBox';
import { useEffect } from 'react';
import { CHATROOMURL, SERVERURL } from '../../configs/Link.url';
import { useRecoilValue } from 'recoil';
import useSearch from '../../hooks/useSearch';
import { PUBLIC } from '../../configs/RoomType';
import CancelIcon from '@mui/icons-material/Cancel';
import {
  ListGenerateLayout,
  ListLayout,
  ListUlLayout,
} from '../../atoms/list/styles/ListStylesCSS';
import { HandleInviteList } from '../../types/Room.type';
import {
  BaseUserProfileData,
  UserProfileBoxDataType,
  UserProfileBoxType,
} from '../../types/Profile.type';
import { CustomIconProps } from '../../types/Link.type';
import CustomIconButton from '../../atoms/button/icon/CustomIconButtion';
import UserProfileBox from '../ProfileSection/UserProfileBox';
import { userDataAtom } from '../../recoil/user.recoil';

/*
 * AsideSearchBox로 감싼 이유는
 * 공통적으로 사용하는 searchBox가 상위 레이아웃에 기반하여 모양을 잡기 때문
 * 예) 상위 레이아웃이 w: 50px에 h: 40px 이면 search box도 마찬가지 크기가 됨.
 */
const SetInviteLayout = styled('div')(({ theme }) => ({
  width: '90%',
  height: '35%',
  backgroundColor: '#7B61FF66',
  borderRadius: '10px',
  marginBottom: '3%',
}));

const SearchBoxLayout = styled('div')(({ theme }) => ({
  width: '80%',
  height: '19%',
  maxHeight: '56px',
  marginLeft: '9.5%',
  display: 'flex',
}));

const InvitedListLayout = styled('section')(({ theme }) => ({
  width: '80%',
  height: '65%',
  marginLeft: '9.5%',
  overflow: 'auto',
}));

const CustomIconButtonLayout = styled('div')(({ theme }) => ({
  marginTop: '-10%',
  marginLeft: '70%',
  width: '20px',
  position: 'absolute',
  zIndex: '2',
}));

function SetChatRoomInviteModule(props: {
  handleInviteList: HandleInviteList;
}) {
  const {
    newParticipantList,
    setNewParticipantList,
    handleParticipant: handler,
  } = props.handleInviteList;
  const handleParticipant = handler;
  const user = useRecoilValue(userDataAtom);
  const searchProps = useSearch(
    `${SERVERURL}/users/${user.id}/friends/search`,
    CHATROOMURL,
    PUBLIC,
  );

  useEffect(() => {
    const partis: number[] = newParticipantList.map((newParti) => {
      return newParti.id;
    });
    handleParticipant([...partis]);
  }, [newParticipantList]);

  const listElement: React.ReactElement[] = newParticipantList.map(
    (newParti: BaseUserProfileData) => {
      const profileInfo: UserProfileBoxDataType = {
        nickname: newParti.nickname,
        image: newParti.image,
      };
      const userProfileBoxProps: UserProfileBoxType = {
        isButton: false,
        avatarType: 'none',
        userData: profileInfo,
      };
      const cancelInvite = () => {
        const popParticipantList = newParticipantList.filter(
          (popParticipant) => {
            return popParticipant.id !== newParti.id;
          },
        );
        const partis: number[] = popParticipantList.map((newParti) => {
          return newParti.id;
        });
        setNewParticipantList([...popParticipantList]);
        handleParticipant([...partis]);
      };
      const cancleProps: CustomIconProps = {
        icon: <CancelIcon />,
        action: cancelInvite,
      };
      return (
        <ListLayout key={newParti.id}>
          <UserProfileBox userProfileBoxProps={userProfileBoxProps} />
          <CustomIconButtonLayout>
            <CustomIconButton customProps={cancleProps} />
          </CustomIconButtonLayout>
        </ListLayout>
      );
    },
  );
  return (
    <SetInviteLayout>
      <Typography margin="3%" variant="h5">
        채팅방 초대
      </Typography>
      <SearchBoxLayout>
        <SearchBox searchProps={searchProps} />
      </SearchBoxLayout>
      <InvitedListLayout>
        <ListGenerateLayout>
          <ListUlLayout>{listElement}</ListUlLayout>
        </ListGenerateLayout>
      </InvitedListLayout>
    </SetInviteLayout>
  );
}

export default SetChatRoomInviteModule;
