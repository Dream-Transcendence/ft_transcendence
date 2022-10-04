import './App.css';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import ChatroomPage from './pages/ChatChannelPage';
import NicknamePage from './pages/NicknamePage';
import GameCreatePage from './pages/GameCreatePage';
import GameLodingPage from './pages/GameLodingPage';
import GamePlayPage from './pages/GamePlayPage';
import { RecoilRoot } from 'recoil';
import PingpongRoutePage from './pages/PingpongRoutePage';
import { Navigate, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { PROFILEURL } from './configs/Link.url';

function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/nickname" element={<NicknamePage />} />
        {/* 구글 2차인증 페이지 추가될 예정 */}
        {/* [axios POST 요청] 서버 측으로 로그인시도 전달 */}
        <Route path="pingpong" element={<Navigate replace to={PROFILEURL} />} />
        <Route path="/pingpong/*" element={<PingpongRoutePage />} />
        {/* 추후에 url을 통해 직접들어가지 못하고 game 버튼을 통해서만 접근 가능하도록 수정 */}
        <Route path="*" element={<Navigate replace to={PROFILEURL} />} />
      </Routes>
    </RecoilRoot>
  );
}

export default App;
