import styled from '@emotion/styled';
import { LineAxisOutlined } from '@mui/icons-material';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import {
  atom,
  atomFamily,
  RecoilState,
  selector,
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
import ProfilePage from './ProfilePage';

const PageSection = styled('section')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

// //프로필, 채팅, 게임 모두 닉네임과 사진을 사용하므로 상단에 atom생성
// export const baseUserProfileData = atom<BaseUserProfileData>({
//   key: 'baseUserProfileData',
//   default: {
//     id: 1,
//     userNickname: 'Kang pro',
//     image: 'https://cdn.intra.42.fr/users/sonkang.jpg',
//   },
// });

// export const mockUserProfileData = atom<BaseUserProfileData>({
//   key: 'mockUserProfileData',
//   default: {
//     id: 2,
//     userNickname: 'Kang pro',
//     image: 'https://cdn.intra.42.fr/users/sonkang.jpg',
//   },
// });

//실제로 data 받을시 예상 값과 사용할 로직
/**{
  "id": 0,
  "nickname": "string",
  "image": "string"
} */
// export const userData = selector<BaseUserProfileData>({
//   key: 'userData',
//   get: async ({ get }) => {
//     const respones = await axios.get('/users');
//     console.log(respones);
//     return respones.data;
//   },
// });

function PingpongRoutePage() {
  // const a = useRecoilValue(userData);
  return (
    <PageSection>
      <header>
        <nav>
          <NavigationBar></NavigationBar>
        </nav>
      </header>
      <Routes>
        <Route path="profile" element={<Navigate replace to={PROFILEURL} />} />
        <Route path="profile/*" element={<ProfilePage />} />
        <Route path="channels" element={<ChatroomPage />} />
        <Route path="gamecreate" element={<GameCreatePage />} />
        <Route path="gameplay" element={<GamePlayPage />} />
        <Route path="gameloding" element={<GameLodingPage />} />
      </Routes>
    </PageSection>
  );
}

export default PingpongRoutePage;
