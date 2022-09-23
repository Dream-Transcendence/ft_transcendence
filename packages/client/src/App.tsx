import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import ChatroomPage from './pages/ChatChannelPage';
import NicknamePage from './pages/NicknamePage';
import GameCreatePage from './pages/GameCreatePage';
import GameLodingPage from './pages/GameLodingPage';
import GamePlayPage from './pages/GamePlayPage';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/nickname" element={<NicknamePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/chatRoom" element={<ChatroomPage />} />
        <Route path="/gameCreate" element={<GameCreatePage />} />
        <Route path="/gamePlay" element={<GamePlayPage />} />
        <Route path="/gameLoding" element={<GameLodingPage />} />
        {/* 추후에 url을 통해 직접들어가지 못하고 game 버튼을 통해서만 접근 가능하도록 수정 */}
      </Routes>
    </RecoilRoot>
  );
}

export default App;
