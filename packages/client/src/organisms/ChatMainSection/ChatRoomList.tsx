import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ChatRoomElementOrganisms from './ChatRoomElement';
import ListGenerate from '../../components/list/ListGenerate';

const ChatRoomListLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
}));

function ChatRoomListOrganisms() {
  return (
    <ChatRoomListLayout>
      {ListGenerate(<ChatRoomElementOrganisms />)}
    </ChatRoomListLayout>
  );
}

export default ChatRoomListOrganisms;
