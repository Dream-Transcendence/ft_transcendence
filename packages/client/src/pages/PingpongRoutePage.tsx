import styled from '@emotion/styled';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import NavigationBar from '../atoms/bar/NavigationBar';
import { PROFILEURL } from '../configs/Link.url';
import {
  userDataAtom,
  gameTypeAtom,
  checkIsSecondOauth,
} from '../recoil/user.recoil';
import { userStateListAtom } from '../recoil/user.recoil';
import { logOn, userNameSpace } from '../socket/event';
import useSocket from '../socket/useSocket';
import { UserStateType } from '../types/LogOn.type';
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

//로그인 한 사람들 목록
const logOnListMock = [
  {
    id: 1,
    logOn: true,
    onGame: true,
  },
  {
    id: 2,
    logOn: true,
    onGame: true,
  },
  {
    id: 3,
    logOn: false,
    onGame: false,
  },
  {
    id: 4,
    logOn: true,
    onGame: true,
  },
  {
    id: 5,
    logOn: true,
    onGame: true,
  },
];

function PingpongRoutePage() {
  const [socket, connect, disconnect] = useSocket(userNameSpace);
  const userData = useRecoilValue(userDataAtom);
  const navigate = useNavigate();
  const [logStateList, setLogStateList] =
    useRecoilState<UserStateType[]>(userStateListAtom);
  const [passSecondOauth, setPassSecondOauth] =
    useRecoilState<boolean>(checkIsSecondOauth);
  //로그온 정보 날리기 친구정보 가져다줄것
  //로그온관련 소켓 네임스페이스(ws://localhost:4242/user) 연결작업

  useEffect(() => {
    //[수정사항][2nd] api완성기다리는중
    // if (userData.id === 0 || passSecondOauth === false) navigate('/');
    if (userData.id === 0) navigate('/');
  }, [userData.id, passSecondOauth, navigate]);

  useEffect(() => {
    function setUserSocketConnect() {
      connect();
      socket.emit(
        `${logOn}`,
        {
          userId: userData.id,
        },
        (response: UserStateType[]) => {
          console.log('logOn users:', response);
          setLogStateList(logOnListMock); //로그인 중인 유저들 정보  받기
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
  }, [userData.id]);
  //connect, disconnect를 빼 첫 랜더링 시에만 socket 생성 및 연결하도록 함, id 또한 재 로그인 하지 않는이상 다시 바뀔 일은 없겠지만 일단 남겨 둠

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
      {/* <footer>
       <Popup>{SendMessageAlert(`${user.id} === ${userId}`)}</Popup>
      </footer> */}
    </PageSection>
  );
}

export default PingpongRoutePage;
