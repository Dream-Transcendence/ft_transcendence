import { styled } from '@mui/material/styles';
import AsideSearchBoxModule from '../modules/ChatSidebar/AsideSearchBox';
import AsideCurrentChatRoomModule from '../modules/ChatSidebar/AsideCurrentChatRoom';
import AsideFriendListModule from '../modules/ChatSidebar/AsidefriendList';
import AisdeCreateChatRoomModule from '../modules/ChatSidebar/AsideCreateChatRoom';

const ChatSidebarLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
}));

function ChatSidebarTemplate() {
  return (
    <ChatSidebarLayout>
      <AsideSearchBoxModule />
      <AsideCurrentChatRoomModule />
      <AsideFriendListModule />
      <AisdeCreateChatRoomModule />
    </ChatSidebarLayout>
  );
}

export default ChatSidebarTemplate;
