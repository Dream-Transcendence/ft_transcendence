import * as React from 'react';
import { styled } from '@mui/material/styles';
import ChatRoomListOrganisms from '../../organisms/ChatMainSection/ChatRoomList';

const ChattingRoomListLayout = styled('div')(({ theme }) => ({
  width: '97%',
  height: '100%',
  marginLeft: '2%',
}));

function ChatRoomListTemplate() {
  return (
    <ChattingRoomListLayout>
      <ChatRoomListOrganisms />
    </ChattingRoomListLayout>
  );
}

export default ChatRoomListTemplate;
