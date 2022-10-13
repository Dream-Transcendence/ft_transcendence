import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  ListGenerateLayout,
  ListLayout,
  ListUlLayout,
} from '../../atoms/list/styles/ListStylesCSS';
import UserProfileBox from '../../molecules/ProfileSection/UserProfileBox';
import { userDataAtom } from '../../pages/PingpongRoutePage';
import { chatRoomList, getJoinedChatList } from '../../recoil/chat.recoil';
import { chatNameSpace, enterChannel } from '../../socket/event';
import useSocket from '../../socket/useSocket';
import { UserProfileBoxDataType } from '../../types/Profile.type';

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
  const [roomlist, setRoomList] = useRecoilState(chatRoomList);
  const joinedChatList = useRecoilValue(getJoinedChatList(userData.id));
  const [socket] = useSocket(chatNameSpace);
  const [error, setError] = useState(false);
  let res = false;
  const navigate = useNavigate();
  useEffect(() => {
    setRoomList(joinedChatList.channelList);
  }, [joinedChatList.channelList, setRoomList]);

  const listElement: React.ReactElement[] = roomlist.map((room: any) => {
    const profileData: UserProfileBoxDataType = {
      nickname: room.name,
      image: room.image,
    };

    //error 소켓 보내줘!
    const enterRoom = async () => {
      await socket.emit(
        `${enterChannel}`,
        {
          userId: userData.id,
          roomId: room.id,
        },
        (err: any, response: any) => {
          console.log('enter room success ', response); // "got it"
          console.log('!!', err);
          res = response.isEntered;
          setError(true);
          navigate(`/pingpong/channel/room/${room.id}`);
        },
      );
      console.log(error);
      if (!error) alert('error');
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
