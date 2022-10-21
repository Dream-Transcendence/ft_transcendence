import styled from '@emotion/styled';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { atom, useRecoilValue } from 'recoil';
import NavigationBar from '../atoms/bar/NavigationBar';
import { PROFILEURL } from '../configs/Link.url';
import { userDataAtom } from '../recoil/user.recoil';
import { logOn, userNameSpace } from '../socket/event';
import useSocket from '../socket/useSocket';
import { BaseUserProfileData } from '../types/Profile.type';
import ChatroomPage from './ChatChannelPage';
import GameCreatePage from './GameCreatePage';
import GameLoadingPage from './GameLodingPage';
import GamePlayPage from './GamePlayPage';
import ProfilePage from './ProfilePage';

const PageSection = styled('section')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

//기본 유저 데이터 초초기기화
// useEffect(() => {
//   async function getUserData() {
//     const response = await axios.get(`${SERVERURL}users/${id}/profile`);
//     console.log(response.data);
//     setUser(response.data);
//   }
//   try {
//     getUserData();
//   } catch {
//     console.log('error: PingpongRoutePage()');
//   }
// }, [userData]);
//닉네임 2차인증 끝나고 받은 접속 유저 정보 목업데이터

function PingpongRoutePage() {
  const [socket, connect, disconnect] = useSocket(userNameSpace);
  const userData = useRecoilValue(userDataAtom);

  //로그온 정보 날리기 친구정보 가져다줄것
  //로그온관련 소켓 네임스페이스(ws://localhost:4242/user) 연결작업
  useEffect(() => {
    function setChatSocketConnect() {
      connect();
      socket.emit(
        `${logOn}`,
        {
          userId: userData.id,
        },
        (response: any) => {
          console.log('logOn user:', response);
        },
      );
      socket.on('exception', (response: any) => {
        alert(response.message);
      });
    }
    setChatSocketConnect();
    return () => {
      socket.off('exception');
      disconnect();
      //logoff자동실행, 접속중인 친구들에게 detectlogoff 이벤트 발송한다고함
    };
  }, [userData.id, socket, connect, disconnect]);

  return (
    <PageSection>
      <header>
        <nav>
          <NavigationBar></NavigationBar>
        </nav>
      </header>
      <Routes>
        {/* 사용자 프로필페이지 */}
        <Route
          path="profile"
          element={<Navigate replace to={`${PROFILEURL}/${userData.id}`} />}
        />
        <Route path="profile/:userId" element={<ProfilePage />} />
        <Route path="channel/*" element={<ChatroomPage />} />
        <Route path="gamecreate/*" element={<GameCreatePage />} />
        <Route path="gameplay/:userId" element={<GamePlayPage />} />
        <Route path="gameloading/*" element={<GameLoadingPage />} />
      </Routes>
    </PageSection>
  );
}

export default PingpongRoutePage;
