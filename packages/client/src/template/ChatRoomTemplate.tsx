import SectionRoomInfoModule from '../modules/ChatSection/SectionRoomInfo';
import Chatting from '../organisms/ChatMainSection/Chatting';
import { styled } from '@mui/material/styles';
import ChatParticipants from '../organisms/ChatMainSection/ChatParticipants';

const ChattingRoomLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
}));

const ChatRoomFeaterLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '89%',
  display: 'flex',
  marginTop: '0%',
}));

function ChatRoomTemplate() {
  return (
    <ChattingRoomLayout>
      <SectionRoomInfoModule />
      <ChatRoomFeaterLayout>
        <Chatting />
        <ChatParticipants />
      </ChatRoomFeaterLayout>
    </ChattingRoomLayout>
  );
}

export default ChatRoomTemplate;
