import styled from '@emotion/styled';
import { Route, Routes } from 'react-router-dom';
import NavigationBar from '../atoms/bar/NavigationBar';
import ChatroomPage from './ChatChannelPage';
import GameCreatePage from './GameCreatePage';
import GameLodingPage from './GameLodingPage';
import GamePlayPage from './GamePlayPage';
import OtherProfilePage from './OtherProfilePage';
import ProfilePage from './ProfilePage';

const PageSection = styled('section')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

function PingpongLayout() {
  return (
    <PageSection>
      <header>
        <nav>
          <NavigationBar></NavigationBar>
        </nav>
      </header>
      <Routes>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="channel/*" element={<ChatroomPage />} />
        <Route path="otherprofile" element={<OtherProfilePage />} />
        <Route path="gamecreate" element={<GameCreatePage />} />
        <Route path="gameplay" element={<GamePlayPage />} />
        <Route path="gameloding" element={<GameLodingPage />} />
        {/* 추후에 url을 통해 직접들어가지 못하고 game 버튼을 통해서만 접근 가능하도록 수정 */}
      </Routes>
    </PageSection>
  );
}

export default PingpongLayout;
