import styled from '@emotion/styled';
import { LineAxisOutlined } from '@mui/icons-material';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import { atom, selector, useRecoilState } from 'recoil';
import NavigationBar from '../atoms/bar/NavigationBar';
import { BaseUserProfileData, IsUserProfilePage } from '../types/Profile.type';
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


//프로필, 채팅, 게임 모두 닉네임과 사진을 사용하므로 상단에 atom생성
export const baseUserProfileData = atom<BaseUserProfileData>({
  key: 'baseUserProfileData',
  default: {
    id: 1,
    userNickname: 'Kang pro',
    image: 'https://cdn.intra.42.fr/users/sonkang.jpg',
  }
});

export const mockUserProfileData = atom<BaseUserProfileData>({
  key: 'mockUserProfileData',
  default: {
    id: 2,
    userNickname: 'Kang pro',
    image: 'https://cdn.intra.42.fr/users/sonkang.jpg',
  }
});

//실제로 data 받을시 예상 값과 사용할 로직
/**{
  "id": 0,
  "nickname": "string",
  "image": "string"
} */
export const baseUserProfileSelectorData = selector<BaseUserProfileData>({
  key: 'baseUserProfileSelectorData',
  get: async ({ get }) => {
    const respones = await axios.get('/users');
    return respones.data;
  }
});


export const isUserProfilePage = selector({
  key: 'isUserProfilePage',
  get: ({ get }) => {
    const baseUser = get(baseUserProfileData);
    const otherUser = get(mockUserProfileData);
    if (baseUser.id !== otherUser.id) {
      return false;
    }
    return true
  }
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