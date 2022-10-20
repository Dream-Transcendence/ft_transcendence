import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SERVERURL } from '../../configs/Link.url';
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
import { userDataAtom } from '../../pages/PingpongRoutePage';
import { userAuth, userStatus } from '../../recoil/chat.recoil';
import { COMMON } from '../../configs/userType';
import { ControlMessage, ReceivedMessage } from '../../types/Message.type';

const ChattingRoomLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
}));

const ChattingBanLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
}));

const BannedLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
}));

const ChatRoomFeaterLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '89%',
  display: 'flex',
  marginTop: '0%',
}));

// export const fetchParticipantData = async (roomId: string, userId: number) => {
//   const response = await axios.get(
//     `${SERVERURL}/rooms/${roomId}/channel/${userId}/participants`,
//   );
//   setParticipantInfo(response.data);
// };

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
  //[수정사항] any => ChannelParticipantDto
  const [participantInfo, setParticipantInfo] = useState<ParticipantInfo[]>([]);
  const { roomId } = useParams();
  const userData = useRecoilValue(userDataAtom);
  const [userType, setUserType] = useRecoilState(userAuth);
  const [userState, setUserState] = useRecoilState(userStatus);

  useEffect(() => {
    async function getRoomInfo() {
      try {
        // [수정사항] 도메인이 아직 확실하지 않아서 보류
        const response = await axios.get(
          `${SERVERURL}/rooms/${roomId}/${userData.id}`,
        );
        setRoomInfo(response.data);
        setUserState(roomInfo.status);
      } catch (error) {
        alert(error);
        throw console.dir(error);
      }
    }
    getRoomInfo();
  }, [roomId, userData.id]);

  useEffect(() => {
    async function getParticipantInfo() {
      try {
        //랜더링 시,   "Uncaught" error로 인해 조건을 걸어줌.
        //5 === 랜더링 안됨.
        if (roomInfo.type !== DM && roomInfo.type !== 5) {
          const response = await axios.get(
            `${SERVERURL}/rooms/${roomId}/channel/${userData.id}/participants`,
          );
          setParticipantInfo(response.data);
        }
      } catch (error) {
        alert(error);
        throw console.dir(error);
      }
    }
    getParticipantInfo();
  }, [roomId, userData.id, roomInfo.type]);

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
  useEffect(() => {
    if (roomInfo.type !== DM && roomInfo.type !== 5) {
      const count: number = participantInfo.length;
      if (count !== 0) {
        setPersonnel(count);
        setUserType(useFindUserAuth);
        setUserState(useFindUserStatus);
      }
    }
  }, [participantInfo.length, setUserType]);

  const roomInfoSet: RoomInfoSet = {
    roomInfo: { ...roomInfo, personnel: personnel },
    handler: handleRoomInfo,
  };
  //룸 정보에 인원수 넣을ㄷ것
  const participantInfoSet: ParticipantInfoSet = {
    participantInfo: participantInfo,
    handler: setParticipantInfo,
  };

  return (
    <ChattingRoomLayout>
      {userState !== BAN ? (
        <ChattingBanLayout>
          <EnteredChatRoomInfoOrganisms roomInfoSet={roomInfoSet} />
          <ChatRoomFeaterLayout>
            <ChattingOrganisms roomInfo={roomInfo} />
            {roomInfo.type !== DM && roomInfo.type !== 5 && (
              <ChatParticipantsOrganisms
                participantInfoSet={participantInfoSet}
              />
            )}
          </ChatRoomFeaterLayout>
        </ChattingBanLayout>
      ) : (
        <BannedLayout>😛</BannedLayout>
      )}
    </ChattingRoomLayout>
  );
}

export default EnteredChatRoomTemplate;
