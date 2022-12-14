import './App.css';
import LandingPage from './pages/LandingPage';
import NicknamePage from './pages/NicknamePage';
import { RecoilRoot } from 'recoil';
import PingpongRoutePage from './pages/PingpongRoutePage';
import { Navigate, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { PROFILEURL } from './configs/Link.url';
import React from 'react';
import Loader from './atoms/Loading/Loader';
import SecondOauthPage from './pages/SecondOauthPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <RecoilRoot>
      <React.Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/nickname" element={<NicknamePage />} />
          <Route path="/nickname/*" element={<NotFoundPage />} />
          {/* 구글 2차인증 페이지 추가될 예정 */}
          {/* [axios POST 요청] 서버 측으로 로그인시도 전달 */}
          <Route path="/secondOauth" element={<SecondOauthPage />} />
          <Route path="/secondOauth/*" element={<NotFoundPage />} />
          <Route
            path="pingpong"
            element={<Navigate replace to={PROFILEURL} />}
          />
          <Route path="/pingpong/*" element={<PingpongRoutePage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="/404/*" element={<NotFoundPage />} />
          <Route path="/*" element={<LandingPage />} />
          {/* 추후에 url을 통해 직접들어가지 못하고 game 버튼을 통해서만 접근 가능하도록 수정 */}
        </Routes>
      </React.Suspense>
    </RecoilRoot>
  );
}

export default App;
