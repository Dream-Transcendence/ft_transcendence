import NavigationBar from '../atoms/bar/NavigationBar';
import ChatSidebarTemplate from '../template/ChatMainSection/ChatSidebarTemplate';
import EnteredChatRoomTemplate from '../template/ChatMainSection/EnteredChatRoomTemplate';
import ChatRoomDefaultTemplate from '../template/ChatMainSection/ChatRoomDefaultTemplate';
import ChatRoomListTemplate from '../template/ChatMainSection/ChatRoomListTemplate';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  atom,
  selector,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { CHANNELURL, CHATROOMURL, SERVERURL } from '../configs/Link.url';
import { LineAxisOutlined } from '@mui/icons-material';
import axios from 'axios';
import styled from '@emotion/styled';
import { userDataAtom } from './PingpongRoutePage';

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

// export const changedList = atom<string>({

// });

/*
 * 리스트를 쪼개서 아톰으로 관리??
 * 최초 랜더링 시, data 받아옴
 *
 */
//[수정사항]any => 프론트에서 알려줄것
const getRoomList = async (userId: number) => {
  const { data } = await axios.get(`${SERVERURL}/users/${userId}/rooms`, {});
  return data;
};

export const getJoinedChatList = selectorFamily<any, number>({
  key: '',
  get:
    (userId) =>
    async ({ get }) => {
      try {
        const response = await getRoomList(userId);
        return response;
      } catch (error) {
        console.dir(error);
      }
    },
});

//채팅방 리스트 받아오는 비동기요청
function ChatroomPage() {
  const userData = useRecoilValue(userDataAtom);
  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    async function getRoomList() {
      try {
        //api 수정됨 rooms/channles -> rooms/userid/channels
        const response = await axios.get(
          `${SERVERURL}/rooms/${userData.id}/channels`,
        );
        setRoomList(response.data);
      } catch (error) {
        alert(error);
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
            {/* <Route path="dm/" element={<Navigate replace to={CHANNELURL} />} /> */}
            <Route path="room/:roomId" element={<EnteredChatRoomTemplate />} />
            {/* <Route path="dm/:dmId" element={<EnteredDMTemplate />} /> */}
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
