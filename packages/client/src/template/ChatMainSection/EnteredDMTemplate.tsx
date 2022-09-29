import { styled } from '@mui/material/styles';
import ChatParticipantsOrganisms from '../../organisms/ChatMainSection/ChatParticipants';
import ChattingOrganisms from '../../organisms/ChatMainSection/Chatting';
import BasicSpeedDial from '../../atoms/SpeedDial/SpeedDial';
import EnteredDMInfoOrganisms from '../../organisms/ChatMainSection/EnteredDMInfo';

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
      <EnteredDMInfoOrganisms />
      <ChatRoomFeaterLayout>
        <ChattingOrganisms />
      </ChatRoomFeaterLayout>
    </ChattingRoomLayout>
  );
}

export default EnteredChatRoomTemplate;
