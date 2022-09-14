import * as React from 'react';
import { styled } from '@mui/material/styles';
import ListGenerate from '../../components/list/ListGenerate';
import UserChatParticipantsBox from '../../modules/ProfileSection/UserChatParticipants';
import BasicSpeedDial from '../../components/SpeedDial/SpeedDial';

const ChatParticipantsListLayout = styled('div')(({ theme }) => ({
  width: '98%',
  height: '90%',
}));

function ChatParticipantsListOrganisms() {
  return (
    <ChatParticipantsListLayout>
      {ListGenerate(<UserChatParticipantsBox />)}
    </ChatParticipantsListLayout>
  );
}

export default ChatParticipantsListOrganisms;
