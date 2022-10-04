import styled from '@emotion/styled';
import NavigationBar from '../atoms/bar/NavigationBar';
import ChatSidebarTemplate from '../template/ChatMainSection/ChatSidebarTemplate';
import EnteredChatRoomTemplate from '../template/ChatMainSection/EnteredChatRoomTemplate';
import EnteredDMTemplate from '../template/ChatMainSection/EnteredDMTemplate';
import ChatRoomDefaultTemplate from '../template/ChatMainSection/ChatRoomDefaultTemplate';
import ChatRoomListTemplate from '../template/ChatMainSection/ChatRoomListTemplate';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Dispatch, SetStateAction, useState } from 'react';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { CHANNELURL, CHATROOMURL } from '../configs/Link.url';

const ChatChannel = styled('section')(({ theme }) => ({
  width: '100%',
  height: '95.7%',
  display: 'flex',
  flexDirection: 'column',
}));

const MainSection = styled('section')(({ theme }) => ({
  width: '100%',
  height: '100%',
  minWidth: '1200px',
  minHeight: '700px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  flex: 1,
}));

const Section = styled('section')(({ theme }) => ({
  width: '59%',
  height: '100%',
  backgroundColor: '#432AC5',
}));

const Aside = styled('aside')(({ theme }) => ({
  width: '19%',
  height: '100%',
  backgroundColor: '#194DD2',
}));

function ChatroomPage() {
  //나중에 room의 배열로 바꿀 것 비동기 요청
  let existenceRoom: boolean = false;
  //임시로 스트링 타입으로 설정 향후, room정보 값을 바꿀 것
  // const [openRoom, setOpenRoom] = useState<string | null>(null);
  //채팅방 유무 검사하는 비동기요청

  //existenceRoom =
  return (
    <ChatChannel>
      <MainSection>
        <Aside>
          <ChatSidebarTemplate />
        </Aside>
        <Section>
          {/* 채팅방의 유무에 따라 보여줄 것 */}
          {/* 향후 api에 따라 조정될 조건입니다. */}
          <Routes>
            <Route path="room/" element={<Navigate replace to={CHANNELURL} />} />
            <Route path="dm/" element={<Navigate replace to={CHANNELURL} />} />
            <Route path="room/:roomNumber" element={<EnteredChatRoomTemplate />} />
            <Route path="dm/:dmNumber" element={<EnteredDMTemplate />} />
            {existenceRoom ? (
            <Route path="/" element={<ChatRoomDefaultTemplate />} />
          ) : (
            <Route path="/" element={<ChatRoomListTemplate />} />
          )}
          </Routes>
        </Section>
      </MainSection>
      <footer></footer>
    </ChatChannel>
  );
}

export default ChatroomPage;
