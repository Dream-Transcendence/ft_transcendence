import * as React from 'react';
import { styled } from '@mui/material/styles';
import ChatRoomElementOrganisms from '../../organisms/ChatMainSection/ChatRoomElement';
import ChatRoomListOrganisms from '../../organisms/ChatMainSection/ChatRoomList';
import ListGenerate from '../../atoms/list/ListGenerate';
import { ListElement } from '../../types/List.type';
import ListGenerator from '../../atoms/list/ListGenerator';
import {
  ListGenerateLayout,
  ListLayout,
  ListUlLayout,
} from '../../atoms/list/styles/ListStylesCSS';

const ChattingRoomListLayout = styled('div')(({ theme }) => ({
  width: '97%',
  height: '100%',
  marginLeft: '2%',
}));

//DTO 확정되면 수정할 것 ChannelDto[]
function ChatRoomListTemplate(roomList: any) {
  const rooms = roomList.roomList;
  console.log(rooms);
  const listElement: React.ReactComponentElement<any> = rooms.map(
    (room: any) => (
      <ListLayout key={room.id}>
        <ChatRoomElementOrganisms roomInfo={room} />
      </ListLayout>
    ),
  );

  return (
    <ChattingRoomListLayout>
      <ListGenerateLayout>
        <ListUlLayout>{listElement}</ListUlLayout>
      </ListGenerateLayout>
    </ChattingRoomListLayout>
  );
}

export default ChatRoomListTemplate;
