import { Input, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchBox from '../../atoms/input/SearchBox';
import ListGenerate from '../../atoms/list/ListGenerate';
import UserProfileBox from '../ProfileSection/UserProfileBox';
import UserInviteProfileBox from '../ProfileSection/UserInviteBox';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CHATROOMURL, SERVERURL } from '../../configs/Link.url';
import { SearchPropsType } from '../../types/search.type';
import { userDataAtom } from '../../pages/PingpongRoutePage';
import { useRecoilState, useRecoilValue } from 'recoil';
import useSearch from '../../hooks/useSearch';
import { PUBLIC } from '../../configs/RoomType';
import { newParticipant } from '../../recoil/chat.recoil';
import CancelIcon from '@mui/icons-material/Cancel';
import {
  ListGenerateLayout,
  ListLayout,
  ListUlLayout,
} from '../../atoms/list/styles/ListStylesCSS';
import axios from 'axios';
import { HandleInviteList, RoomList } from '../../types/Room.type';
import UserChatParticipantsBox from '../ProfileSection/UserChatParticipants';
import {
  UserProfileBoxDataType,
  UserProfileBoxType,
} from '../../types/Profile.type';
import CustomBoxButton from '../../atoms/button/icon/CustomBoxButton';
import { CustomIconProps } from '../../types/Link.type';
import CustomIconButton from '../../atoms/button/icon/CustomIconButtion';

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
    addedParticipantList,
    setAddedParticipantList,
    handleParticipant: handler,
  } = props.handleInviteList;
  const [ParticipantList, setParticipantList] = useRecoilState(newParticipant);
  const handleParticipant = handler;
  const user = useRecoilValue(userDataAtom);
  const searchProps = useSearch(
    `${SERVERURL}/users/${user.id}/friends/search`,
    CHATROOMURL,
    PUBLIC,
  );

  async function getAddedParticpant(id: number) {
    await axios.get(`${SERVERURL}/users/${id}/profile`).then((res) => {
      const participantList: RoomList = {
        id: res.data.id,
        image: res.data.image,
        name: res.data.nickname,
        recvMessageCount: 0,
      };
      setAddedParticipantList([...addedParticipantList, participantList]);
    });
  }

  function checkInArray(id: number) {
    return function (addedParticipant: RoomList) {
      return addedParticipant.id !== id;
    };
  }

  useEffect(() => {
    ParticipantList.map((id) => {
      if (addedParticipantList.every(checkInArray(id))) {
        getAddedParticpant(id);
        handleParticipant([...ParticipantList]);
      }
      return;
    });
  }, [ParticipantList, addedParticipantList]);

  const listElement: React.ReactElement[] = addedParticipantList.map(
    (addedParticipant: RoomList) => {
      const profileInfo: UserProfileBoxDataType = {
        nickname: addedParticipant.name,
        image: addedParticipant.image,
      };
      const userProfileBoxProps: UserProfileBoxType = {
        isButton: false,
        avatarType: 'none',
        userData: profileInfo,
      };
      const cancelInvite = () => {
        const popParticipantList = ParticipantList.filter((popParticipant) => {
          return popParticipant !== addedParticipant.id;
        });
        setParticipantList([...popParticipantList]);
        handleParticipant([...popParticipantList]);
        const popDisplayParticipantList = addedParticipantList.filter(
          (Participant) => Participant.id !== addedParticipant.id,
        );
        setAddedParticipantList([...popDisplayParticipantList]);
      };
      const cancleProps: CustomIconProps = {
        icon: <CancelIcon />,
        action: cancelInvite,
      };
      return (
        <ListLayout key={addedParticipant.id}>
          <UserProfileBox userProfileBoxProps={userProfileBoxProps} />
          <CustomIconButtonLayout>
            <CustomIconButton customProps={cancleProps} />
          </CustomIconButtonLayout>
        </ListLayout>
      );
    },
  );

  //[수정사항] 검색 컴포넌트 완성 후, 작업할 예정
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
