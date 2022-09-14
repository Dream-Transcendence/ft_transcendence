import { styled } from '@mui/material/styles';
import SearchBoxModule from '../../modules/ChatSidebar/SearchBox';
import JoinedChatRoomModule from '../../organisms/ChatSidebar/JoinedChatRoomList';
import CreateChatRoomModule from '../../modules/ChatSidebar/CreateChatRoom';
import JoinedDMListOrganisms from '../../organisms/ChatSidebar/JoinedDMList';
import { Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

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
        variant="h6"
        borderRadius={20}
        border={5}
        borderColor="#9C27B0"
        color="#0A92B0"
      >
        채팅방 목록
      </Typography>
      <JoinedChatRoomModule />
      <Typography
        variant="h6"
        borderRadius={20}
        border={5}
        borderColor="#9C27B0"
        color="#0A92B0"
      >
        {' '}
        DM 목록{' '}
      </Typography>
      <JoinedDMListOrganisms />
      <CreateChatRoomModule />
    </ChatSidebarLayout>
  );
}

export default ChatSidebarTemplate;
