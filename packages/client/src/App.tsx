import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import ChatroomPage from './pages/ChatChannelPage';

function App() {
  return (
    <Routes>
      <Route path="/chatRoom" element={<ChatroomPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
}

export default App;
