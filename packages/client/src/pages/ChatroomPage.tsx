import styled from '@emotion/styled';
import NavigationBar from '../components/bar/NavigationBar';
import SearchBox from '../components/input/SearchBox';
import AsideSearchBoxModule from '../modules/ChatSidebar/AsideSearchBox';
import AsideCurrentChatRoomModule from '../modules/ChatSidebar/AsideCurrentChatRoom';
import AsideFriendListModule from '../modules/ChatSidebar/AsidefriendList';
import AisdeCreateChatRoomModule from '../modules/ChatSidebar/AsideCreateChatRoom';
import SectionRoomInfoModule from '../modules/ChatSection/SectionRoomInfo';
import Chatting from '../organisms/ChatMainSection/Chatting';
import ChatParticipants from '../organisms/ChatMainSection/ChatParticipants';

const Chatroom = styled('section')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const MainSection = styled('section')(({ theme }) => ({
  width: '100%',
  height: '100%',
  minWidth: '800px',
  minHeight: '700px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  flex: 1,
}));

const Section = styled('section')(({ theme }) => ({
  width: '59%',
  height: '100%',
  backgroundColor: '#432AC5',
}));

const Aside = styled('aside')(({ theme }) => ({
  width: '19%',
  height: '100%',
  backgroundColor: '#194DD2',
}));

const ChatRoomFeaterLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '89%',
  display: 'flex',
  marginTop: '0%',
}));

function ChatroomPage() {
  return (
    <Chatroom>
      <header>
        <nav>
          <NavigationBar></NavigationBar>
        </nav>
      </header>
      <MainSection>
        <Aside>
          <AsideSearchBoxModule />
          <AsideCurrentChatRoomModule />
          <AsideFriendListModule />
          <AisdeCreateChatRoomModule />
        </Aside>
        <Section>
          <SectionRoomInfoModule />
          <ChatRoomFeaterLayout>
            <Chatting />
            <ChatParticipants />
          </ChatRoomFeaterLayout>
        </Section>
      </MainSection>
      <footer></footer>
    </Chatroom>
  );
}

export default ChatroomPage;
