import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import NavigationBar from '../atoms/bar/NavigationBar';
import { PROFILEURL } from '../configs/Link.url';
import { userDataAtom, gameTypeAtom } from '../recoil/user.recoil';
import { userLogStateListAtom } from '../recoil/user.recoil';
import { CHANGEUSERSTATUS, logOn, USERLOGOFF, userNameSpace } from '../socket/event';
import useSocket from '../socket/useSocket';
import { ConnectionDto, ConnectionsDto } from '../types/LogOn.type';
import { BaseUserProfileData } from '../types/Profile.type';
import ChatroomPage from './ChatChannelPage';
import GameCreatePage from './GameCreatePage';
import GameLoadingPage from './GameLoadingPage';
import GamePlayPage from './GamePlayPage';
import ProfilePage from './ProfilePage';

const PageSection = styled('section')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

function PingpongRoutePage() {
  const [socket, connect, disconnect] = useSocket(userNameSpace);
  const userData = useRecoilValue(userDataAtom);
  const [userLogStateList, setUserLogStateList] =
    useRecoilState<ConnectionDto[]>(userLogStateListAtom);
  // const [userChangedState, setUserChangedState] = useState<ConnectionDto>({    
  //   userId: 0,
  //   onGame: false,}
  // );
  const navigate = useNavigate();
  //로그온 정보 날리기 친구정보 가져다줄것
  //로그온관련 소켓 네임스페이스(ws://localhost:4242/user) 연결작업

  const findChanged = (userChangedState : ConnectionDto) => {
    const myIndex: number = userLogStateList.findIndex((user) => {
      return user.userId === userChangedState?.userId;
    })
    return myIndex;
  }

  useEffect(() => {
    function setUserSocketConnect() {
      connect();
      socket.emit(
        logOn,
        {
          userId: userData.id,
          onGame: false,
        },
        (response: ConnectionsDto) => {
          setUserLogStateList(response.connections); //로그인 중인 유저들 정보  받기
        },
      );
      socket.on('exception', (response: any) => {
        alert('이미 로그인 한 상태입니다.');
        navigate('/');
      });
    }
    setUserSocketConnect();
    console.log('logs', userLogStateList);
    //check friend's log state changing
    socket.on(CHANGEUSERSTATUS, (response: ConnectionDto) => {
      // setUserChangedState(response);
      const idx = findChanged(response)
      const newList = userLogStateList.splice(idx, 1, response);
      setUserLogStateList(newList);
    });
    socket.on(USERLOGOFF, (response: ConnectionDto) => {
      const idx = findChanged(response)
      const newList = userLogStateList.splice(idx, 1);
      setUserLogStateList(newList);
    });
    return () => {
      socket.off('exception');
      disconnect();
      //logoff자동실행, 접속중인 친구들에게 detectlogoff 이벤트 발송한다고함
    };
    //logStateList deps에 넣어두긴 했는데, 로그인 정보가 바뀌었다고 여기에서 랜더링 될 필요가 있나..??
  }, [userData.id, socket]);
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
