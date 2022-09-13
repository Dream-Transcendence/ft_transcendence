import EnteredRoomInfoModule from '../../modules/ChatSection/EnteredRoomInfo';
import { styled } from '@mui/material/styles';
import ChatParticipantsOrganisms from '../../organisms/ChatMainSection/ChatParticipants';
import ChattingOrganisms from '../../organisms/ChatMainSection/Chatting';

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

function EnteredChatRoomTemplate() {
  return (
    <ChattingRoomLayout>
      <EnteredRoomInfoModule />
      <ChatRoomFeaterLayout>
        <ChattingOrganisms />
        <ChatParticipantsOrganisms />
      </ChatRoomFeaterLayout>
    </ChattingRoomLayout>
  );
}

export default EnteredChatRoomTemplate;
