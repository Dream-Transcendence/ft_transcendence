import styled from '@emotion/styled';
import { useCallback, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import NavigationBar from '../atoms/bar/NavigationBar';
import { GAMELOADINGURL, NOTFOUNDURL, PROFILEURL } from '../configs/Link.url';
import {
  ACCEPTGAME,
  CHANGEUSERSTATUS,
  FRIENDREQUEST,
  FRIENDREQUESTACCEPTED,
  INVITEGAME,
  logOn,
  REJECTFRIENDREQUEST,
  USERLOGOFF,
  userNameSpace,
} from '../socket/event';
import {
  userDataAtom,
  userLogStateListAtom,
  userSecondAuth,
} from '../recoil/user.recoil';
import useSocket from '../socket/useSocket';
import { ConnectionDto, ConnectionsDto } from '../types/LogOn.type';
import { BaseUserProfileData, UserSecondAuth } from '../types/Profile.type';
import ChatroomPage from './ChatChannelPage';
import GameRoutePage from './GameRoutePage';
import ProfilePage from './ProfilePage';
import axios from 'axios';
import {
  InviteInfoListType,
  RequestDto,
  ServerAcceptGameDto,
} from '../types/Message.type';
import {
  checkFriendRequestAtom,
  inviteInfoListAtom,
} from '../recoil/common.recoil';
import { GameInviteInfoType, ServerInviteGameDto } from '../types/Game.type';
import { gameInviteInfoAtom } from '../recoil/game.recoil';
import LiveObservePage from './LiveObservePage';
import { NavigateNextTwoTone } from '@mui/icons-material';

const PageSection = styled('section')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const NavSection = styled('nav')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

function PingpongRoutePage() {
  const [socket, connect, disconnect] = useSocket(userNameSpace);

  const [userData, setUserData] = useRecoilState(userDataAtom);
  const navigate = useNavigate();
  const passSecondOauth = useRecoilValue<UserSecondAuth>(userSecondAuth);
  const [userLogStateList, setUserLogStateList] =
    useRecoilState<ConnectionDto[]>(userLogStateListAtom);
  const [inviteInfoList, setInviteInfoList] =
    useRecoilState<InviteInfoListType[]>(inviteInfoListAtom);
  const setCheckFriendRequest = useSetRecoilState(checkFriendRequestAtom);
  const [gameInviteInfo, setGameInviteInfo] =
    useRecoilState<GameInviteInfoType>(gameInviteInfoAtom);
  const setSecondAuth = useSetRecoilState(userSecondAuth);

  useEffect(() => {
    //정상적인 접근인지 판단하는 로직
    if (userData.id === 0 || passSecondOauth.checkIsValid === false)
      navigate('/');
  }, [userData.id, passSecondOauth, navigate]);

  //로그온 정보 날리기 친구정보 가져다줄것
  //로그온관련 소켓 네임스페이스(ws://localhost:4242/user) 연결작업
  useEffect(() => {
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
    return () => {
      disconnect();
      socket.close();
      //logoff자동실행, 접속중인 친구들에게 detectlogoff 이벤트 발송한다고함
    };
  }, []);
  //connect, disconnect를 빼 첫 랜더링 시에만 socket 생성 및 연결하도록 함

  /**
   * 유저의 미확인 메시지 기록 받아오기
   */
  useEffect(() => {
    async function getMessageList() {
      await axios
        .get(
          `${process.env.REACT_APP_SERVER_URL}/users/${userData.id}/requests`,
        )
        .then((response: any) => {
          if (response.data.length > 0) {
            const infoList = response.data.map((message: any) => {
              return {
                id: message.id,
                userId: message.requestor.id,
                message: `${message.requestor.nickname}님이 친구요청을 보냈습니다.`,
                type: 'friend',
              };
            });
            setInviteInfoList([...inviteInfoList, ...infoList]);
          }
        })
        .catch((error) => {
          if (error.response.data.statusCode === 401) navigate('/');
          else {
            alert(error);
          }
        });
    }
    getMessageList();
  }, []);

  //hook에서 사용되는 함수로써 매번 랜더링시마다 새로 함수가 만들어 져야하므로 useCallback으로 함수의 재생성 방지
  const findChanged = useCallback(
    (userChangedState: ConnectionDto) => {
      const myIndex: number = userLogStateList.findIndex((user) => {
        return user.userId === userChangedState?.userId;
      });
      return myIndex;
    },
    [userLogStateList],
  );

  /**
   * 다른 유저의 state 변경 감지 effect
   */
  useEffect(() => {
    //check friend's log state changing
    socket.on(CHANGEUSERSTATUS, (response: ConnectionDto) => {
      const idx = findChanged(response);
      if (userLogStateList.length > 0 && idx !== -1) {
        //emit한 결과를 받은 list가 존재해야함
        const newList = [...userLogStateList];
        //기존 상태값 변경
        newList.splice(idx, 1, response);
        setUserLogStateList(newList);
      } else if (idx === -1) {
        //로그인 유저 추가
        const newList = [...userLogStateList, response];
        setUserLogStateList(newList);
      }
    });
    return () => {
      socket.off(CHANGEUSERSTATUS); //모든 리스너 제거
    };
  }, [userLogStateList, setUserLogStateList, findChanged, socket]); //userLogStateList, setUserLogStateList, findChanged, socket

  /**
   * logoff한 친구 상태 받기
   */
  useEffect(() => {
    socket.on(USERLOGOFF, (response: ConnectionDto) => {
      const idx = findChanged(response);
      if (userLogStateList.length > 0 && idx !== -1) {
        const newList = [...userLogStateList];
        //logoff면 로그인 한 리스트에서 제거
        newList.splice(idx, 1);
        setUserLogStateList(newList);
      }
    });
    return () => {
      socket.off(USERLOGOFF); //모든 리스너 제거
    };
  }, [userLogStateList, setUserLogStateList, findChanged, socket]); //userLogStateList, setUserLogStateList, findChanged, socket

  /**
   * 친구 요청 받기
   */
  useEffect(() => {
    socket.on(FRIENDREQUEST, (response: RequestDto) => {
      const { id, requestor } = response;
      const { id: userId, nickname } = requestor;
      const newMessage: InviteInfoListType = {
        id: id,
        userId: userId,
        message: `${nickname}님이 친구를 신청하셨습니다.`,
        type: 'friend',
      };
      setInviteInfoList([...inviteInfoList, newMessage]);
    });
    return () => {
      socket.off(FRIENDREQUEST);
    };
  }, [inviteInfoList, setInviteInfoList, socket]);

  /**
   * 친구 요청 받은 상대방이 수락 했는지 확인
   */
  useEffect(() => {
    socket.on(FRIENDREQUESTACCEPTED, (response: BaseUserProfileData) => {
      if (response) {
        setCheckFriendRequest(true);
        /**
         * 상대방 수락 확인 메시지 기록 추가
         */
        const reply = () => {
          return {
            userId: response.id,
            message: `${response.nickname}님이 요청을 수락했습니다.`,
            type: 'check',
          };
        };
        setInviteInfoList([...inviteInfoList, reply()]);
      }
    });
  }, []);

  //친구 추가 거절 메시지 받기
  useEffect(() => {
    socket.on(REJECTFRIENDREQUEST, (response: BaseUserProfileData) => {
      if (response) {
        /**
         * 상대방 거절 확인 메시지 기록
         */
        const reply = () => {
          return {
            userId: response.id,
            message: `${response.nickname}님이 요청을 거절했습니다.`,
            type: 'check',
          };
        };
        setInviteInfoList([...inviteInfoList, reply()]);
      }
    });
  }, []);

  /**
   * 게임 초대 받기
   */
  useEffect(() => {
    socket.on(INVITEGAME, (response: ServerInviteGameDto) => {
      const { host, mode } = response;
      const { id: userId, nickname } = host;
      const newMessage: InviteInfoListType = {
        userId: userId,
        message: `${nickname}님이 게임을 초대하셨습니다.`,
        type: 'game',
        mode: mode,
      };
      setInviteInfoList([...inviteInfoList, newMessage]);
    });
    return () => {
      socket.off(INVITEGAME);
    };
  }, [inviteInfoList, setInviteInfoList, socket]);

  /**
   * 게임 수락 이후 title 받고 match 요청
   */
  useEffect(() => {
    socket.on(ACCEPTGAME, (response: ServerAcceptGameDto) => {
      setGameInviteInfo({
        ...gameInviteInfo,
        title: response.title,
        mode: response.mode,
      });
      navigate(GAMELOADINGURL);
    });
    return () => {
      socket.off(ACCEPTGAME);
    };
  }, []);

  const logoutHandler = async () => {
    try {
      await axios
        .post(`${process.env.REACT_APP_SERVER_URL}/auth/logout`)
        .then((res) => {
          setUserData({
            id: 0,
            nickname: 'xxxxxxxxxxxxxxx',
            image: '',
          });
          setSecondAuth({
            checkIsSecondOauth: false,
            checkIsValid: true,
          });
          navigate('/');
        });
    } catch (error) {}
  };

  useEffect(() => {
    socket.on('exception', (error: any) => {
      if (error.code === 100) {
        alert(error.message);
        navigate('/');
        logoutHandler();
      } else if (error.code === 101) {
        alert(error.message);
        setInviteInfoList((prev) => {
          return [...prev.slice(0, -1)];
        });
      } else {
        alert(error.message);
        navigate(PROFILEURL);
      }
    });
    return () => {
      socket.off('exception');
    };
  }, []);

  return (
    <PageSection>
      <header>
        <NavSection>
          <NavigationBar></NavigationBar>
        </NavSection>
      </header>
      <Routes>
        {/* 사용자 프로필페이지 */}
        <Route
          path="profile"
          element={<Navigate replace to={`${PROFILEURL}/${userData.id}`} />}
        />
        <Route path="profile/:userId" element={<ProfilePage />} />
        <Route path="channel/*" element={<ChatroomPage />} />
        <Route path="game/*" element={<GameRoutePage />} />
        <Route path="observe" element={<LiveObservePage />} />
        <Route path="/*" element={<Navigate replace to={NOTFOUNDURL} />} />
      </Routes>
    </PageSection>
  );
}

export default PingpongRoutePage;
