import * as React from 'react';
import { styled } from '@mui/material/styles';
import ChatRoomListOrganisms from '../../organisms/ChatMainSection/ChatRoomList';

const ChattingRoomDefaultLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
}));

function ChatRoomListTemplate() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return (
    <ChattingRoomDefaultLayout>
      <ChatRoomListOrganisms />
    </ChattingRoomDefaultLayout>
  );
}

export default ChatRoomListTemplate;
