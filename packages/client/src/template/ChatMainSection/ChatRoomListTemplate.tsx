import * as React from 'react';
import { styled } from '@mui/material/styles';
import ChatRoomElementOrganisms from '../../organisms/ChatMainSection/ChatRoomElement';
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

/*
 * public, protect, 가입된 방 제외 채팅방 목록을 나타내는 템플릿입니다.
 */
//[수정사항] DTO 확정되면 수정할 것 any => ChannelDto[]
function ChatRoomListTemplate(props: { roomList: any[] }) {
  const roomList = props.roomList;
  const listElement: React.ReactElement[] = roomList.map((room: any) => {
    return (
      <ListLayout key={room.id}>
        <ChatRoomElementOrganisms roomInfo={room} />
      </ListLayout>
    );
  });

  return (
    <ChattingRoomListLayout>
      <ListGenerateLayout>
        <ListUlLayout>{listElement}</ListUlLayout>
      </ListGenerateLayout>
    </ChattingRoomListLayout>
  );
}

export default ChatRoomListTemplate;
