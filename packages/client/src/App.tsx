import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import ChatroomPage from './pages/ChatChannelPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/chatRoom" element={<ChatroomPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default App;
