import * as React from 'react';
import { styled } from '@mui/material/styles';
import ListGenerate from '../../atoms/list/ListGenerate';
import UserChatParticipantsBox from '../../molecules/ProfileSection/UserChatParticipants';
import BasicSpeedDial from '../../atoms/SpeedDial/SpeedDial';

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
