import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import NavigationBar from '../atoms/bar/NavigationBar';
import { NOTFOUNDURL, PROFILEURL, SERVERURL } from '../configs/Link.url';
import {
  ACCEPTGAME,
  CHANGEUSERSTATUS,
  FRIENDREQUEST,
  FRIENDREQUESTACCEPTED,
  GAMEMATCH,
  gameNameSpace,
  INVITEGAME,
  logOn,
  REJECTFRIENDREQUEST,
  REJECTGAME,
  USERLOGOFF,
  userNameSpace,
} from '../socket/event';
import {
  userDataAtom,
  gameTypeAtom,
  userLogStateListAtom,
  userSecondAuth,
} from '../recoil/user.recoil';
import useSocket from '../socket/useSocket';
import { ConnectionDto, ConnectionsDto } from '../types/LogOn.type';
import {
  BaseUserProfileData,
  FriendType,
  UserSecondAuth,
} from '../types/Profile.type';
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
import NotFoundPage from './NotFoundPage';
import { GameInviteInfoType, ServerInviteGameDto } from '../types/Game.type';
import { gameInviteInfoAtom } from '../recoil/game.recoil';

const PageSection = styled('section')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

function PingpongRoutePage() {
  const [socket, connect, disconnect] = useSocket(userNameSpace);
  const [gameSocket] = useSocket(gameNameSpace);
  const userData = useRecoilValue(userDataAtom);
  const navigate = useNavigate();
  const [passSecondOauth, setPassSecondOauth] =
    useRecoilState<UserSecondAuth>(userSecondAuth);
  const [userLogStateList, setUserLogStateList] =
    useRecoilState<ConnectionDto[]>(userLogStateListAtom);
  const [inviteInfoList, setInviteInfoList] =
    useRecoilState<InviteInfoListType[]>(inviteInfoListAtom);
  const [checkFriendRequest, setSheckFriendRequest] = useRecoilState(
    checkFriendRequestAtom,
  );
  const [gameInviteInfo, setGameInviteInfo] =
    useRecoilState<GameInviteInfoType>(gameInviteInfoAtom);

  useEffect(() => {
    //정상적인 접근인지 판단하는 로직
    if (userData.id === 0 || passSecondOauth.checkIsValid === false)
      navigate('/');
  }, [userData.id, passSecondOauth, navigate]);

  //로그온 정보 날리기 친구정보 가져다줄것
  //로그온관련 소켓 네임스페이스(ws://localhost:4242/user) 연결작업
  useEffect(() => {
    connect();
    console.log('로그온입니다.');
    socket.emit(
      logOn,
      {
        userId: userData.id,
        onGame: false,
      },
      (response: ConnectionsDto) => {
        setUserLogStateList(response.connections); //로그인 중인 유저들 정보  받기
        console.log('로그온 유저 목록');
        console.log(response);
      },
    );
    return () => {
      // socket.off('exception'); //exception 리스너가 없는데 off를 해야하나???
      console.log('로그오프입니다.');
      disconnect();
      socket.close();
      //logoff자동실행, 접속중인 친구들에게 detectlogoff 이벤트 발송한다고함
    };
    //logStateList deps에 넣어두긴 했는데, 로그인 정보가 바뀌었다고 여기에서 랜더링 될 필요가 있나..??
  }, []);
  //connect, disconnect를 빼 첫 랜더링 시에만 socket 생성 및 연결하도록 함, id 또한 재 로그인 하지 않는이상 다시 바뀔 일은 없겠지만 일단 남겨 둠

  /**
   * 유저의 미확인 메시지 기록 받아오기
   */
  useEffect(() => {
    async function getMessageList() {
      await axios
        .get(`${SERVERURL}/users/${userData.id}/requests`)
        .then((response: any) => {
          if (response.data.length > 0) {
            console.log('유저 메시지 기록 가져오기 : ', response);
            const infoList = response.data.map((message: any) => {
              return {
                id: message.id,
                userId: message.requestor.id,
                message: `${message.requestor.nickname}님이 친구요청을 보냈습니다.`,
                type: 'friend',
              };
            });
            console.log(inviteInfoList, 'to', infoList);
            setInviteInfoList([...inviteInfoList, ...infoList]);
          }
        })
        .catch((error) => {
          alert(error);
          console.log(error);
        });
    }
    getMessageList();
    console.log(inviteInfoList);
  }, []);

  //hook에서 사용되는 함수로써 매번 랜더링시마다 새로 함수가 만들어 져야하므로 useCallback으로 함수의 재생성 방지
  const findChanged = useCallback(
    (userChangedState: ConnectionDto) => {
      console.log('기존 로그인 중인 사람들 목록', userLogStateList);
      console.log('상태 바뀐사람 : ', userChangedState);
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
      console.log('불특정 유저 상태 변경');
      const idx = findChanged(response);
      if (userLogStateList.length > 0 && idx !== -1) {
        //emit한 결과를 받은 list가 존재해야함
        const newList = [...userLogStateList];
        //기존 상태값 변경
        newList.splice(idx, 1, response);
        console.log('기존 상태 변경', newList);
        setUserLogStateList(newList);
      } else if (idx === -1) {
        //로그인 유저 추가
        const newList = [...userLogStateList, response];
        console.log('새로운 유저 로그인', newList);
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

  // useEffect(() => {
  //   socket.onAny((res) => {
  //     console.log(res, 'what! tje fucl');
  //   });
  // }, []);

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
      console.log('socket : 친구 요청을 받았습니다.', newMessage);
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
      console.log('friendRequestAccepted', response);
      if (response) {
        setSheckFriendRequest(true);
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
        console.log(inviteInfoList, 'to accecpt', reply);
        setInviteInfoList([...inviteInfoList, reply()]);
      }
    });
  }, []);

  //친구 추가 거절 메시지 받기
  useEffect(() => {
    socket.on(REJECTFRIENDREQUEST, (response: BaseUserProfileData) => {
      if (response) {
        console.log('rejectFriendRequest', response);
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
        console.log(inviteInfoList, 'to reject', reply);
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
      console.log('socket : 게임 초대를 받았습니다.', newMessage);
    });
    return () => {
      socket.off(INVITEGAME);
    };
  }, [inviteInfoList, setInviteInfoList, socket]);

  /**
   * 게임 수락 이후 title 받기
   */
  useEffect(() => {
    socket.on(ACCEPTGAME, (response: ServerAcceptGameDto) => {
      gameSocket.emit(
        GAMEMATCH,
        {
          title: response.title,
          userId: userData.id,
          mode: gameInviteInfo.mode,
        },
        (response: any) => {
          console.log('match emit 성공 : ', response);
        },
      );
    });
  }, [gameInviteInfo, setGameInviteInfo, socket]);

  useEffect(() => {
    socket.on('exception', (error: any) => {
      alert(error.message);
    });
    return () => {
      socket.off('exception');
    };
  }, []);

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
        <Route path="game/*" element={<GameRoutePage />} />
        <Route path="/*" element={<Navigate replace to={NOTFOUNDURL} />} />
      </Routes>
    </PageSection>
  );
}

export default PingpongRoutePage;
