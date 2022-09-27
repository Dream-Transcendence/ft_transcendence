import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ChatRoomElementOrganisms from './ChatRoomElement';
import ListGenerate from '../../atoms/list/ListGenerate';
import { OpenRoomProps } from '../../template/ChatMainSection/ChatRoomListTemplate';

const ChatRoomListLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
}));

function ChatRoomListOrganisms(props: { openRoomProps: OpenRoomProps }) {
  const { openRoomProps } = props;
  return (
    <ChatRoomListLayout>
      <ListGenerate
        element={<ChatRoomElementOrganisms openRoomProps={openRoomProps} />}
      />
    </ChatRoomListLayout>
  );
}

export default ChatRoomListOrganisms;
