import { styled } from '@mui/material/styles';
import SearchBoxModule from '../../molecules/ChatSidebar/SearchBox';
import JoinedChatRoomModule from '../../organisms/ChatSidebar/JoinedChatRoomList';
import CreateChatRoomModule from '../../molecules/ChatSidebar/CreateChatRoom';
import JoinedDMListOrganisms from '../../organisms/ChatSidebar/JoinedDMList';
import { Typography } from '@mui/material';

const ChatSidebarLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

function ChatSidebarTemplate() {
  return (
    <ChatSidebarLayout>
      <SearchBoxModule />
      <Typography
        fontFamily="Lato, sans-serif"
        fontWeight={'bold'}
        borderRadius={20}
        border={5}
        borderColor="#44113211"
        color="#0A92B0"
      >
        채팅방 목록
      </Typography>
      <JoinedChatRoomModule />
      <Typography
        borderRadius={20}
        fontFamily="Lato, sans-serif"
        fontWeight={'bold'}
        border={5}
        borderColor="#44113211"
        color="#0A92B0"
      >
        DM 목록
      </Typography>
      <JoinedDMListOrganisms />
      <CreateChatRoomModule />
    </ChatSidebarLayout>
  );
}

export default ChatSidebarTemplate;
