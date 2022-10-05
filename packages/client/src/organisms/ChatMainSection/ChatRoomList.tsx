import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ChatRoomElementOrganisms from './ChatRoomElement';
import ListGenerate from '../../atoms/list/ListGenerate';

const ChatRoomListLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
}));

//DTO 확정되면 수정할 것 ChannelDto[]
function ChatRoomListOrganisms(roomList: any) {
  const rooms = roomList.roomList;
  //채팅방 리스트 목록을 요청하는 api
  return (
    <ChatRoomListLayout>
      <ul>
        {rooms.map((roomInfo: any) => (
          <li key={roomInfo.id}>
            <ChatRoomElementOrganisms roomInfo={roomInfo.roomInfo} />
          </li>
        ))}
      </ul>
    </ChatRoomListLayout>
  );
}

export default ChatRoomListOrganisms;
