import styled from '@emotion/styled';
import NavigationBar from '../components/bar/NavigationBar';
import ChatSidebarTemplate from '../template/ChatMainSection/ChatSidebarTemplate';
import EnteredChatRoomTemplate from '../template/ChatMainSection/EnteredChatRoomTemplate';
import ChatRoomDefaultTemplate from '../template/ChatMainSection/ChatRoomDefaultTemplate';
import ChatRoomListTemplate from '../template/ChatMainSection/ChatRoomListTemplate';

const ChatChannel = styled('section')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const MainSection = styled('section')(({ theme }) => ({
  width: '100%',
  height: '100%',
  minWidth: '1200px',
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

function ChatroomPage() {
  return (
    <ChatChannel>
      <header>
        <nav>
          <NavigationBar></NavigationBar>
        </nav>
      </header>
      <MainSection>
        <Aside>
          <ChatSidebarTemplate />
        </Aside>
        <Section>
          {/* <ChatRoomListTemplate /> */}
          <EnteredChatRoomTemplate />
          {/* <ChatRoomDefaultTemplate /> */}
        </Section>
      </MainSection>
      <footer></footer>
    </ChatChannel>
  );
}

export default ChatroomPage;
