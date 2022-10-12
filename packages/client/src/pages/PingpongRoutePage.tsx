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
  const userData = useRecoilValue(userDataAtom);
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