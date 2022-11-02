import ChatSidebarTemplate from '../template/ChatMainSection/ChatSidebarTemplate';
import EnteredChatRoomTemplate from '../template/ChatMainSection/EnteredChatRoomTemplate';
import ChatRoomDefaultTemplate from '../template/ChatMainSection/ChatRoomDefaultTemplate';
import ChatRoomListTemplate from '../template/ChatMainSection/ChatRoomListTemplate';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CHANNELURL } from '../configs/Link.url';
import axios from 'axios';
import styled from '@emotion/styled';
import useSocket from '../socket/useSocket';
import { chatNameSpace } from '../socket/event';
import { getUnJoinedChatList, unJoinedRoomList } from '../recoil/chat.recoil';
import { BaseUserProfileData } from '../types/Profile.type';
import { userDataAtom } from '../recoil/user.recoil';

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
  background:
    'linear-gradient(to top right,#4477cc,#6077cc, #4477cc, #4477cc,#4477cc,  #6077cc, #4477cc,#4477cc)',
  flex: 1,
}));

const Section = styled('section')(({ theme }) => ({
  width: '59%',
  height: '100%',
  backgroundColor: '#231ab4dd',
}));

const Aside = styled('aside')(({ theme }) => ({
  width: '19%',
  height: '100%',
  backgroundColor: '#194DD2',
}));

/*
 * 리스트를 쪼개서 아톰으로 관리??
 * 최초 랜더링 시, data 받아옴
 */

//채팅방 리스트 받아오는 비동기요청
function ChatroomPage() {
  const userData = useRecoilValue(userDataAtom);
  const [roomList, setRoomList] = useRecoilState(unJoinedRoomList);
  const unJoinedChatList = useRecoilValue(getUnJoinedChatList(userData.id));
  const [socket, connect, disconnect] = useSocket(chatNameSpace);
  const navigate = useNavigate();
  const user = useRecoilValue<BaseUserProfileData>(userDataAtom);

  useEffect(() => {
    setRoomList(unJoinedChatList);
  }, [unJoinedChatList, setRoomList]);

  //[수정사항] socket 이 두번 연결됨 아마 리랜더링되는 현상 때문인듯, 막야줘야함
  //채팅관련 소켓 네임스페이스(chat) 연결작업
  useEffect(() => {
    function setChatSocketConnect() {
      connect();
    }
    setChatSocketConnect();
    return () => {
      disconnect();
    };
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
            {/* <Route path="dm/" element={<Navigate replace to={CHANNELURL} />} /> */}
            <Route path="room/:roomId" element={<EnteredChatRoomTemplate />} />
            {roomList?.length ? (
              <Route
                path="/"
                element={<ChatRoomListTemplate roomList={roomList} />}
              />
            ) : (
              <Route path="/" element={<ChatRoomDefaultTemplate />} />
            )}
            <Route path="/*" element={<Navigate replace to={CHANNELURL} />} />
          </Routes>
        </Section>
      </MainSection>
      <footer></footer>
    </ChatChannel>
  );
}

export default ChatroomPage;
