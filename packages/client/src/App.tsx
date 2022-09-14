import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import ChatroomPage from './pages/ChatChannelPage';
import NicknamePage from './pages/NicknamePage';
import GamePage from './pages/GamePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/nickname" element={<NicknamePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/chatRoom" element={<ChatroomPage />} />
      <Route path="/game" element={<GamePage />} />
    </Routes>
  );
}

export default App;
