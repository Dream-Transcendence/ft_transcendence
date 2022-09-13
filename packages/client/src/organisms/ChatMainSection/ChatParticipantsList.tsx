import * as React from 'react';
import { styled } from '@mui/material/styles';
import ListGenerate from '../../components/list/ListGenerate';

const ChatParticipantsListLayout = styled('div')(({ theme }) => ({
  width: '98%',
  height: '90%',
  border: 'solid',
}));

function ChatParticipantsListOrganisms() {
  return (
    <ChatParticipantsListLayout>
      {/* {ListGenerate()} */}
    </ChatParticipantsListLayout>
  );
}

export default ChatParticipantsListOrganisms;
