import * as React from 'react';
import { styled } from '@mui/material/styles';
import ChatRoomListOrganisms from '../../organisms/ChatMainSection/ChatRoomList';

const ChattingRoomListLayout = styled('div')(({ theme }) => ({
  width: '97%',
  height: '100%',
  marginLeft: '2%',
}));

export interface OpenRoomProps {
  setOpenRoom: React.Dispatch<React.SetStateAction<string | null>>;
  openRoom: string | null;
}

function ChatRoomListTemplate(openRoomProps: OpenRoomProps) {
  return (
    <ChattingRoomListLayout>
      <ChatRoomListOrganisms openRoomProps={openRoomProps} />
    </ChattingRoomListLayout>
  );
}

export default ChatRoomListTemplate;
