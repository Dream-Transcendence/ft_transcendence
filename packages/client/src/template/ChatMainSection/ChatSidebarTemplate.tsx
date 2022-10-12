import { styled } from '@mui/material/styles';
import SearchBoxModule from '../../molecules/ChatSidebar/SearchBox';
import JoinedChatRoomModule from '../../organisms/ChatSidebar/JoinedChatRoomList';
import CreateChatRoomModule from '../../molecules/ChatSidebar/CreateChatRoom';
import JoinedDMListOrganisms from '../../organisms/ChatSidebar/JoinedDMList';
import { Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { useRecoilValue } from 'recoil';
import { getJoinedChatList } from '../../pages/ChatChannelPage';
import { userDataAtom } from '../../pages/PingpongRoutePage';

const ChatSidebarLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

function ChatSidebarTemplate() {
  const userData = useRecoilValue(userDataAtom);
  const joinedChatList = useRecoilValue(getJoinedChatList(userData.id));

  console.log('!!!!!!!!!!!!!!!!!!!!!!!!', joinedChatList);

  return (
    <ChatSidebarLayout>
      <SearchBoxModule />
      <Typography
        borderRadius={20}
        border={5}
        borderColor="#9C27B0"
        color="#0A92B0"
      >
        채팅방 목록
      </Typography>
      <JoinedChatRoomModule />
      <Typography
        borderRadius={20}
        border={5}
        borderColor="#9C27B0"
        color="#0A92B0"
      >
        DM 목록{' '}
      </Typography>
      <JoinedDMListOrganisms />
      <CreateChatRoomModule />
    </ChatSidebarLayout>
  );
}

export default ChatSidebarTemplate;
