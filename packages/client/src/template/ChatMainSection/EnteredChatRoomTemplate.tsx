import { styled } from '@mui/material/styles';
import ChatParticipantsOrganisms from '../../organisms/ChatMainSection/ChatParticipants';
import ChattingOrganisms from '../../organisms/ChatMainSection/Chatting';
import EnteredChatRoomInfoOrganisms from '../../organisms/ChatMainSection/EnteredChatRoomInfo';

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
//정보를 여기서 요청해야하나? 아니면 입장할때 요청해야하나..?
function EnteredChatRoomTemplate() {
  return (
    <ChattingRoomLayout>
      <EnteredChatRoomInfoOrganisms />
      <ChatRoomFeaterLayout>
        <ChattingOrganisms />
        <ChatParticipantsOrganisms />
      </ChatRoomFeaterLayout>
    </ChattingRoomLayout>
  );
}

export default EnteredChatRoomTemplate;
