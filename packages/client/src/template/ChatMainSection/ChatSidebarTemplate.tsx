import { styled } from '@mui/material/styles';
import SearchBoxModule from '../../modules/ChatSidebar/SearchBox';
import CurrentChatRoomModule from '../../modules/ChatSidebar/CurrentChatRoom';

import CreateChatRoomModule from '../../modules/ChatSidebar/CreateChatRoom';
import JoinedChatListOrganisms from '../../organisms/ChatMainSection/JoinedChatList';

const ChatSidebarLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
}));

function ChatSidebarTemplate() {
  return (
    <ChatSidebarLayout>
      <SearchBoxModule />
      <CurrentChatRoomModule />
      <JoinedChatListOrganisms />
      <CreateChatRoomModule />
    </ChatSidebarLayout>
  );
}

export default ChatSidebarTemplate;
