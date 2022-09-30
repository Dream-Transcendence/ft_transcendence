import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ChatRoomElementOrganisms from './ChatRoomElement';
import ListGenerate from '../../atoms/list/ListGenerate';

const ChatRoomListLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
}));

function ChatRoomListOrganisms() {
  //채팅방 리스트 목록을 요청하는 api
  return (
    <ChatRoomListLayout>
      <ListGenerate element={<ChatRoomElementOrganisms />} />
    </ChatRoomListLayout>
  );
}

export default ChatRoomListOrganisms;
