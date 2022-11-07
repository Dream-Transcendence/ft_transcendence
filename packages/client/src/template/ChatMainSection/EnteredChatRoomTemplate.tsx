import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SERVERURL, CHANNELURL } from '../../configs/Link.url';
import { DM } from '../../configs/RoomType';
import { BAN } from '../../configs/Status.case';
import ChatParticipantsOrganisms from '../../organisms/ChatMainSection/ChatParticipants';
import ChattingOrganisms from '../../organisms/ChatMainSection/Chatting';
import EnteredChatRoomInfoOrganisms from '../../organisms/ChatMainSection/EnteredChatRoomInfo';
import { GetRoomInfoDto, RoomInfoSet } from '../../types/Room.type';
import {
  ParticipantInfo,
  ParticipantInfoSet,
} from '../../types/Participant.type';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userAuth, userStatus } from '../../recoil/chat.recoil';
import { COMMON } from '../../configs/userType';
import {
  ControlMessage,
  ControlRoomInfo,
  SocketMessage,
} from '../../types/Message.type';
import { userDataAtom, userSecondAuth } from '../../recoil/user.recoil';
import useSocket from '../../socket/useSocket';
import {
  chatNameSpace,
  DELETEMESSAGE,
  ENTERMESSAGE,
  PATCHMESSAGE,
} from '../../socket/event';
import { UserSecondAuth } from '../../types/Profile.type';

const ChattingRoomLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '98%',
}));

const ChattingBanLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
}));

const BannedLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const BannedSpan = styled('span')(({ theme }) => ({
  fontSize: '6.2em',
  color: '#ff0fcc',
  marginBottom: '10%',
  textShadow: '#FC0 1px 0 10px',
}));

const ChatRoomFeaterLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '85.7%',
  display: 'flex',
  marginTop: '0%',
}));

function EnteredChatRoomTemplate() {
  const [roomInfo, setRoomInfo] = useState<GetRoomInfoDto>({
    id: 0,
    userId: 0,
    name: '',
    type: 5,
    image: '',
    title: '',
    personnel: 0,
    auth: null,
    status: null,
  });
  const [personnel, setPersonnel] = useState<number>(0);
  const [participantInfo, setParticipantInfo] = useState<ParticipantInfo[]>([]);
  const { roomId } = useParams();
  const userData = useRecoilValue(userDataAtom);
  const [userType, setUserType] = useRecoilState(userAuth);
  const navigate = useNavigate();
  const [userState, setUserState] = useRecoilState(userStatus);
  const [blockedUser, setBlockedUser] = useState<ParticipantInfo[]>([]);
  const [MessageHistory, setMessageHistory] = useState<SocketMessage[]>([]);
  const passSecondOauth = useRecoilValue<UserSecondAuth>(userSecondAuth);
  const [socket] = useSocket(chatNameSpace);

  useEffect(() => {
    //정상적인 접근인지 판단하는 로직
    if (userData.id === 0 || passSecondOauth.checkIsValid === false)
      navigate('/');
  }, [userData.id, passSecondOauth, navigate]);

  useEffect(() => {
    //정상적인 접근인지 판단하는 로직
    if (socket.disconnected === true) navigate(CHANNELURL);
  }, []);

  useEffect(() => {
    async function getRoomInfo() {
      try {
        const response = await axios.get(
          `${SERVERURL}/rooms/${roomId}/${userData.id}`,
        );
        setRoomInfo(response.data);
        setUserState(roomInfo.status);
      } catch (error) {
        navigate(`${CHANNELURL}`);
        // throw console.dir(error);
      }
    }
    if (userData.id !== 0 && passSecondOauth.checkIsValid !== false) {
      getRoomInfo();
    }
  }, [
    roomId,
    userData.id,
    navigate,
    setRoomInfo,
    roomInfo.status,
    setUserState,
  ]);

  useEffect(() => {
    async function getParticipantInfo() {
      try {
        //랜더링 시,   "Uncaught" error로 인해 조건을 걸어줌.
        //5 === 랜더링 안됨.
        if (
          roomInfo.type !== DM &&
          roomInfo.type !== 5 &&
          roomId !== undefined &&
          +roomId === roomInfo.id
        ) {
          const response = await axios.get(
            `${SERVERURL}/rooms/${roomId}/channel/${userData.id}/participants`,
          );
          setParticipantInfo(response.data);
        }
      } catch (error: any) {
        if (error.response.data.statusCode === 401) navigate('/');
        // alert(error);
        throw console.dir(error);
      }
    }
    getParticipantInfo();
  }, [roomId, userData.id, roomInfo.type, roomInfo]);

  useEffect(() => {
    if (
      roomInfo.type !== DM &&
      roomInfo.type !== 5 &&
      participantInfo.length > 1
    ) {
      const BlockedUser = participantInfo.filter(
        (participant) => participant.blocked,
      );
      setBlockedUser(BlockedUser);
    }
  }, [participantInfo, roomInfo]);

  //참여자데이터를 토대로 본인의 타입이 어떤 타입인지 찾는 함수
  const useFindUserAuth = () => {
    let type;
    if (roomInfo.type !== DM && roomInfo.type !== 5) {
      type = participantInfo.find((participant: ParticipantInfo) => {
        if (participant === null) return false;
        return participant.user.id === userData.id;
      });
    }
    if (type === undefined) return COMMON;
    else return type.auth;
  };

  const useFindUserStatus = () => {
    let type;
    if (roomInfo.type !== DM && roomInfo.type !== 5) {
      type = participantInfo.find((participant: ParticipantInfo) => {
        if (participant === null) return false;
        return participant.user.id === userData.id;
      });
    }
    if (type === undefined) return COMMON;
    else return type.status;
  };

  const handleRoomInfo = (roomInfo: GetRoomInfoDto) => {
    setRoomInfo(roomInfo);
  };

  //cannot update a component ('bacher') while rendering a different component ('...')
  // effect처리하지 않으니 위 에러발생
  //[수정사항] 소켓연결로 인해 로직의 일부를 삭제할예정
  useEffect(() => {
    if (roomInfo.type !== DM && roomInfo.type !== 5) {
      const count: number = participantInfo.length;
      if (count !== 0) {
        setPersonnel(count);
        setUserType(useFindUserAuth);
        setUserState(useFindUserStatus);
      }
    }
  }, [
    participantInfo.length,
    setUserType,
    setUserType,
    setUserState,
    participantInfo,
  ]);

  useEffect(() => {
    function changedParticipantStatus() {
      socket.on(`${PATCHMESSAGE}`, (res) => {
        const editParticipant: ParticipantInfo | undefined =
          participantInfo.find(
            (participant) => participant.user.id === res.userId,
          );
        const filteredParticipants: ParticipantInfo[] = participantInfo.filter(
          (participant) => participant.user.id !== res.userId,
        );
        if (editParticipant !== undefined) {
          const modifiedParticipant: ParticipantInfo = {
            ...editParticipant,
            auth: res.auth,
            status: res.status,
          };
          console.log(
            'modify: ',
            modifiedParticipant,
            'filter:',
            filteredParticipants,
          );
          setParticipantInfo([...filteredParticipants, modifiedParticipant]);
          // if (res.userId === userData.id) {
          //   setUserType(res.auth);
          //   setUserState(res.status);
          // }
        }
      });
    }
    changedParticipantStatus();
    // return () => {
    //   socket.off(`${PATCHMESSAGE}`);
    // };
  }, [participantInfo, socket]);

  const getBlocked = async (blockedUserId: number) => {
    let response;
  };

  useEffect(() => {
    if (
      roomInfo.type !== DM &&
      roomInfo.type !== 5 &&
      participantInfo.length > 1
    ) {
      socket.on(`${ENTERMESSAGE}`, async (res) => {
        try {
          await axios
            .get(`${SERVERURL}/users/${userData.id}/blocks/${res.user.id}`)
            .then((response) => {
              const participant = { ...res, blocked: response.data };
              setParticipantInfo([...participantInfo, participant]);
            });
        } catch (error) {
          console.dir(error);
        }
      });
    }
    return () => {
      socket.off(`${ENTERMESSAGE}`);
    };
  }, [participantInfo, socket]);

  useEffect(() => {
    if (
      roomInfo.type !== DM &&
      roomInfo.type !== 5 &&
      participantInfo.length > 1
    ) {
      socket.on(`${DELETEMESSAGE}`, (res) => {
        const filteredParticipants: ParticipantInfo[] = participantInfo.filter(
          (participant) => {
            return participant.user.id !== +res;
          },
        );
        console.log(res, filteredParticipants);
        setParticipantInfo([...filteredParticipants]);
      });
    }
    return () => {
      socket.off(`${DELETEMESSAGE}`);
    };
  }, [participantInfo, socket]);

  const roomInfoSet: RoomInfoSet = {
    roomInfo: { ...roomInfo, personnel: personnel },
    handler: handleRoomInfo,
  };
  //룸 정보에 인원수 넣을ㄷ것
  const participantInfoSet: ParticipantInfoSet = {
    participantInfo: participantInfo,
    handler: setParticipantInfo,
  };

  const messageSetter: ControlMessage = {
    messages: MessageHistory,
    setMessages: setMessageHistory,
    blockedUser: blockedUser.map((user) => user.user.id),
  };

  const controlRoomInfo: ControlRoomInfo = {
    roomInfo: roomInfo,
    controlMessage: messageSetter,
  };

  return (
    <ChattingRoomLayout>
      {roomInfo.id !== 0 &&
        (userState !== BAN ? (
          <ChattingBanLayout>
            <EnteredChatRoomInfoOrganisms roomInfoSet={roomInfoSet} />
            <ChatRoomFeaterLayout>
              <ChattingOrganisms controlRoomInfo={controlRoomInfo} />
              {roomInfo.type !== DM && roomInfo.type !== 5 && (
                <ChatParticipantsOrganisms
                  participantInfoSet={participantInfoSet}
                />
              )}
            </ChatRoomFeaterLayout>
          </ChattingBanLayout>
        ) : (
          <BannedLayout>
            <BannedSpan>BAN</BannedSpan>
          </BannedLayout>
        ))}
    </ChattingRoomLayout>
  );
}

export default EnteredChatRoomTemplate;
