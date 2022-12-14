import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CHANNELURL } from '../../configs/Link.url';
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
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
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
  const setUserType = useSetRecoilState(userAuth);
  const navigate = useNavigate();
  const [userState, setUserState] = useRecoilState(userStatus);
  const [blockedUser, setBlockedUser] = useState<ParticipantInfo[]>([]);
  const [MessageHistory, setMessageHistory] = useState<SocketMessage[]>([]);
  const passSecondOauth = useRecoilValue<UserSecondAuth>(userSecondAuth);
  const [socket] = useSocket(chatNameSpace);

  useEffect(() => {
    //???????????? ???????????? ???????????? ??????
    if (userData.id === 0 || passSecondOauth.checkIsValid === false)
      navigate('/');
  }, [userData.id, passSecondOauth, navigate]);

  useEffect(() => {
    //???????????? ???????????? ???????????? ??????
    if (socket.disconnected === true) navigate(CHANNELURL);
  }, []);

  useEffect(() => {
    async function getRoomInfo() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/rooms/${roomId}/${userData.id}`,
        );
        setRoomInfo(response.data);
        setUserState(roomInfo.status);
      } catch (error) {
        navigate(`${CHANNELURL}`);
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
    passSecondOauth.checkIsValid,
  ]);

  useEffect(() => {
    async function getParticipantInfo() {
      try {
        //????????? ???,   "Uncaught" error??? ?????? ????????? ?????????.
        //5 === ????????? ??????.
        if (
          roomInfo.type !== DM &&
          roomInfo.type !== 5 &&
          roomId !== undefined &&
          +roomId === roomInfo.id
        ) {
          const response = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/rooms/${roomId}/channel/${userData.id}/participants`,
          );
          setParticipantInfo(response.data);
        }
      } catch (error: any) {
        if (error.response.data.statusCode === 401) navigate('/');
        // alert(error);
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

  //????????????????????? ????????? ????????? ????????? ?????? ???????????? ?????? ??????
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
  // effect???????????? ????????? ??? ????????????
  //[????????????] ??????????????? ?????? ????????? ????????? ???????????????
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
          setParticipantInfo([...filteredParticipants, modifiedParticipant]);
          // if (res.userId === userData.id) {
          //   setUserType(res.auth);
          //   setUserState(res.status);
          // }
        }
      });
    }
    changedParticipantStatus();
    return () => {
      socket.off(`${PATCHMESSAGE}`);
    };
  }, [participantInfo, socket]);

  useEffect(() => {
    if (
      roomInfo.type !== DM &&
      roomInfo.type !== 5 &&
      participantInfo.length > 1
    ) {
      socket.on(`${ENTERMESSAGE}`, async (res) => {
        try {
          await axios
            .get(
              `${process.env.REACT_APP_SERVER_URL}/users/${userData.id}/blocks/${res.user.id}`,
            )
            .then((response) => {
              const participant = { ...res, blocked: response.data.isBlocked };
              setParticipantInfo([...participantInfo, participant]);
            });
        } catch (error) {
          // alert(error);
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
  //??? ????????? ????????? ????????????
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

  useEffect(() => {
    socket.on('exception', (error) => {
      alert(error.message);
    });
    return () => {
      socket.off('exception');
    };
  }, [socket]);

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
