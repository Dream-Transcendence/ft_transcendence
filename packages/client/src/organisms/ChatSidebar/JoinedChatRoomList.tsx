import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import ListGenerate from '../../atoms/list/ListGenerate';
import {
  ListGenerateLayout,
  ListLayout,
  ListUlLayout,
} from '../../atoms/list/styles/ListStylesCSS';
import { SERVERURL } from '../../configs/Link.url';
import ProfileChatRoomBox from '../../molecules/ProfileSection/ProfileChatRoomBox';
import UserProfileBox from '../../molecules/ProfileSection/UserProfileBox';
import { chatRoomList, getJoinedChatList } from '../../pages/ChatChannelPage';
import { userDataAtom } from '../../pages/PingpongRoutePage';
import { UserProfileBoxDataType } from '../../types/Profile.type';
import { RoomList } from '../../types/Room.type';

const JoinedChatRoomLayout = styled('div')(({ theme }) => ({
  height: '35.3%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
}));

const JoinedChatRoomBox = styled('div')(({ theme }) => ({
  marginTop: '6%',
  marginBottom: '4%',
  height: '87%',
  width: '90%',
  borderRadius: '13px',
  backgroundColor: '#001D3D',
}));

const BoxLayout = styled('div')(({ theme }) => ({
  height: '100%',
  marginLeft: '3%',
}));

//[수정사항] any=>chatRoomList 타입

function JoinedChatRoomModule() {
  const userData = useRecoilValue(userDataAtom);
  const [Roomlist, setRoomList] = useRecoilState(chatRoomList);
  const joinedChatList = useRecoilValue(getJoinedChatList(userData.id));
  const navigate = useNavigate();
  useEffect(() => {
    setRoomList(joinedChatList.channelList);
  }, [joinedChatList.channelList, setRoomList]);

  const listElement: React.ReactElement[] = Roomlist.map((room: any) => {
    const profileData: UserProfileBoxDataType = {
      nickname: room.name,
      image: room.image,
    };

    const enterRoom = () => {
      navigate(`/pingpong/channel/room/${room.id}`);
    };

    const userProfileBoxProps = {
      isButton: true,
      avatarType: 'none',
      userData: profileData,
      action: enterRoom,
    };

    return (
      <ListLayout key={room.id}>
        <UserProfileBox userProfileBoxProps={userProfileBoxProps} />
      </ListLayout>
    );
  });

  return (
    <JoinedChatRoomLayout>
      <JoinedChatRoomBox>
        {/* [axios GET 요청] 현재 개설된 채팅방 리스트 요청 */}
        <BoxLayout>
          <ListGenerateLayout>
            <ListUlLayout>{listElement}</ListUlLayout>
          </ListGenerateLayout>
        </BoxLayout>
      </JoinedChatRoomBox>
    </JoinedChatRoomLayout>
  );
}

export default JoinedChatRoomModule;
