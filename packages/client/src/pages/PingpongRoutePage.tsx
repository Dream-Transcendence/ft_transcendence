import styled from '@emotion/styled';
import { LineAxisOutlined } from '@mui/icons-material';
import axios from 'axios';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import {
  atom,
  atomFamily,
  RecoilState,
  selector,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import NavigationBar from '../atoms/bar/NavigationBar';
import { PROFILEURL } from '../configs/Link.url';
import { chatNameSpace, logOn, userNameSpace } from '../socket/event';
import useSocket from '../socket/useSocket';
import { BaseUserProfileData } from '../types/Profile.type';
import ChatroomPage from './ChatChannelPage';
import GameCreatePage from './GameCreatePage';
import GameLodingPage from './GameLodingPage';
import GamePlayPage from './GamePlayPage';
import LandingPage from './LandingPage';
import ProfilePage from './ProfilePage';

const PageSection = styled('section')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

//기본 유저 데이터 초초기기화
// useEffect(() => {
//   async function getUserData() {
//     const response = await axios.get(`${SERVERURL}users/${id}/profile`);
//     console.log(response.data);
//     setUser(response.data);
//   }
//   try {
//     getUserData();
//   } catch {
//     console.log('error: PingpongRoutePage()');
//   }
// }, [userData]);
//닉네임 2차인증 끝나고 받은 접속 유저 정보 목업데이터
export const userDataAtom = atom<BaseUserProfileData>({
  key: 'userData',
  default: {
    id: 1,
    nickname: 'dha',
    image: 'https://cdn.intra.42.fr/users/dha.jpg',
  },
});

function PingpongRoutePage() {
  const [socket, connect, disconnect] = useSocket(userNameSpace);
  const userData = useRecoilValue(userDataAtom);

  //로그온 정보 날리기 친구정보 가져다줄것
  //로그온관련 소켓 네임스페이스(ws://localhost:4242/user) 연결작업
  useEffect(() => {
    function setChatSocketConnect() {
      connect();
      socket.emit(
        `${logOn}`,
        {
          userId: userData.id,
        },
        (response: any) => {
          console.log('logOn user:', response);
        },
      );
      socket.on('exception', (response: any) => {
        alert(response.message);
      });
    }
    setChatSocketConnect();
    return () => {
      socket.off('exception');
      disconnect();
    };
  }, [userData.id, socket, connect, disconnect]);

  return (
    <PageSection>
      <header>
        <nav>
          <NavigationBar></NavigationBar>
        </nav>
      </header>
      <Routes>
        {/* 사용자 프로필페이지 */}
        <Route
          path="profile"
          element={<Navigate replace to={`${PROFILEURL}/${userData.id}`} />}
        />
        <Route path="profile/:userId" element={<ProfilePage />} />
        <Route path="channel/*" element={<ChatroomPage />} />
        <Route path="gamecreate/*" element={<GameCreatePage />} />
        <Route path="gameplay/*" element={<GamePlayPage />} />
        <Route path="gameloding/*" element={<GameLodingPage />} />
      </Routes>
    </PageSection>
  );
}

export default PingpongRoutePage;
