import styled from '@emotion/styled';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { atom, useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import NavigationBar from '../atoms/bar/NavigationBar';
import { PROFILEURL } from '../configs/Link.url';
import { logStateListAtom } from '../recoil/log.recoil';
import { logOn, userNameSpace } from '../socket/event';
import useSocket from '../socket/useSocket';
import { LogStateType } from '../types/LogOn.type';
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

//닉네임 2차인증 끝나고 받은 접속 유저 정보 목업데이터
export const userDataAtom = atom<BaseUserProfileData>({
  key: 'userData',
  default: {
    id: 1,
    nickname: 'dha',
    image: 'https://cdn.intra.42.fr/users/dha.jpg',
  },
});

const logOnListMock = [{
  id: 1,
  logOn: true,
  onGame: true,
},{
  id: 2,
  logOn: true,
  onGame: true,
},{
  id: 3,
  logOn: true,
  onGame: true,
},{
  id: 4,
  logOn: true,
  onGame: true,
},{
  id: 5,
  logOn: true,
  onGame: true,
}]

function PingpongRoutePage() {
  console.log('11');

  const [socket, connect, disconnect] = useSocket(userNameSpace);
  const userData = useRecoilValue(userDataAtom);
  const [logStateList, setLogStateList] = useRecoilState<LogStateType[]>(logStateListAtom);
  //로그온 정보 날리기 친구정보 가져다줄것
  //로그온관련 소켓 네임스페이스(ws://localhost:4242/user) 연결작업
  useEffect(() => {
    function setUserSocketConnect() {
      connect();
      socket.emit(
        `${logOn}`,
        {
          userId: userData.id,
        },
        (response: LogStateType[]) => {
          console.log('logOn users:', response);
          setLogStateList(logOnListMock);
        },
      );
      socket.on('exception', (response: any) => {
        alert(response.message);
      });
    }
    setUserSocketConnect();
    console.log('logs', logStateList);
    return () => {
      socket.off('exception');
      disconnect();
      //logoff자동실행, 접속중인 친구들에게 detectlogoff 이벤트 발송한다고함
    };
    //logStateList deps에 넣어두긴 했는데, 로그인 정보가 바뀌었다고 여기에서 랜더링 될 필요가 있나..??
  }, [userData.id, logStateList, setLogStateList]); //connect, disconnect를 빼니 emit요청을 1번만 함. 이유는 모르겠음..

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
