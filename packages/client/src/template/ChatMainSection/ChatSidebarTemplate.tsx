import { styled } from '@mui/material/styles';
import SearchBoxModule from '../../modules/ChatSidebar/SearchBox';
import JoinedChatRoomModule from '../../organisms/ChatSidebar/JoinedChatRoomList';
import CreateChatRoomModule from '../../modules/ChatSidebar/CreateChatRoom';
import JoinedDMListOrganisms from '../../organisms/ChatSidebar/JoinedDMList';

const ChatSidebarLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
}));

function ChatSidebarTemplate() {
  return (
    <ChatSidebarLayout>
      <SearchBoxModule />
      <JoinedChatRoomModule />
      <JoinedDMListOrganisms />
      <CreateChatRoomModule />
    </ChatSidebarLayout>
  );
}

export default ChatSidebarTemplate;
