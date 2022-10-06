import styled from '@emotion/styled';
import NavigationBar from '../atoms/bar/NavigationBar';
import ChatSidebarTemplate from '../template/ChatMainSection/ChatSidebarTemplate';
import EnteredChatRoomTemplate from '../template/ChatMainSection/EnteredChatRoomTemplate';
import EnteredDMTemplate from '../template/ChatMainSection/EnteredDMTemplate';
import ChatRoomDefaultTemplate from '../template/ChatMainSection/ChatRoomDefaultTemplate';
import ChatRoomListTemplate from '../template/ChatMainSection/ChatRoomListTemplate';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { CHANNELURL, CHATROOMURL, SERVERURL } from '../configs/Link.url';
import { LineAxisOutlined } from '@mui/icons-material';
import axios from 'axios';

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
  backgroundColor: '#6BADE2',
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

//채팅방 리스트 받아오는 비동기요청
function ChatroomPage() {
  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    async function getRoomList() {
      try {
        const response = await axios.get(`${SERVERURL}/rooms/channels`);
        setRoomList(response.data);
      } catch (error) {
        throw console.dir(error);
      }
    }
    getRoomList();
  }, []);

  //임시로 스트링 타입으로 설정 향후, room정보 값을 바꿀 것
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
            <Route
              path="room/"
              element={<Navigate replace to={CHANNELURL} />}
            />
            <Route path="dm/" element={<Navigate replace to={CHANNELURL} />} />
            <Route
              path="room/:roomNumber"
              element={<EnteredChatRoomTemplate />}
            />
            <Route path="dm/:dmNumber" element={<EnteredDMTemplate />} />
            {roomList.length ? (
              <Route
                path="/"
                element={<ChatRoomListTemplate roomList={roomList} />}
              />
            ) : (
              <Route path="/" element={<ChatRoomDefaultTemplate />} />
            )}
          </Routes>
        </Section>
      </MainSection>
      <footer></footer>
    </ChatChannel>
  );
}

export default ChatroomPage;
