import styled from '@emotion/styled';
import { LineAxisOutlined } from '@mui/icons-material';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import {
  atom,
  atomFamily,
  RecoilState,
  selector,
  useRecoilState,
} from 'recoil';
import NavigationBar from '../atoms/bar/NavigationBar';
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
// export const baseUserProfileSelectorData = selector<BaseUserProfileData>({
//   key: 'baseUserProfileSelectorData',
//   get: async ({ get }) => {
//     const respones = await axios.get('/users');
//     return respones.data;
//   },
// });

// export const isUserProfilePage = selector({
//   key: 'isUserProfilePage',
//   get: ({ get }) => {
//     //기존 사용자 정보 받아오기
//     const baseUser = get(baseUserProfileData);
//     //클릭된 컴포넌트 유저 정보 받아오기
//     const otherUser = get(mockUserProfileData);
//     if (baseUser.id !== otherUser.id) {
//       return false;
//     }
//     return true;
//   },
// });

//유저의 현재 spot을 확인하여 클릭된 위치와 다를 때 해당 component를 띄워주는 함수

export const userSpot = atom<string>({
  key: 'userSpot',
  default: 'profile',
});

function PingpongRoutePage() {
  return (
    <PageSection>
      <header>
        <nav>
          <NavigationBar></NavigationBar>
        </nav>
      </header>
      <Routes>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="channels/*" element={<ChatroomPage />} />
        <Route path="gamecreate" element={<GameCreatePage />} />
        <Route path="gameplay" element={<GamePlayPage />} />
        <Route path="gameloding" element={<GameLodingPage />} />
        {/* 추후에 url을 통해 직접들어가지 못하고 game 버튼을 통해서만 접근 가능하도록 수정 */}
      </Routes>
    </PageSection>
  );
}

export default PingpongRoutePage;
