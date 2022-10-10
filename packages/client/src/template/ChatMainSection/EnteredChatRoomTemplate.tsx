import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SERVERURL } from '../../configs/Link.url';
import { DM } from '../../configs/RoomType';
import ChatParticipantsOrganisms from '../../organisms/ChatMainSection/ChatParticipants';
import ChattingOrganisms from '../../organisms/ChatMainSection/Chatting';
import EnteredChatRoomInfoOrganisms from '../../organisms/ChatMainSection/EnteredChatRoomInfo';
import { RoomInfoSet } from '../../types/Room.type';
import { ParticipantInfoSet } from '../../types/Participant.type';

const ChattingRoomLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
}));

const ChatRoomFeaterLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '89%',
  display: 'flex',
  marginTop: '0%',
}));

function EnteredChatRoomTemplate() {
  //[수정사항] any => ChannelDto
  const [roomInfo, setRoomInfo] = useState<any>({
    name: '',
    type: 5,
    image: '',
  });
  //[수정사항] any => DmUserDto
  const [DMInfo, setDMInfo] = useState<any>({
    id: 0,
    nickname: 'default',
    image: 'default',
    blocked: true,
  });
  //[수정사항] any => ChannelParticipantDto
  const [participantInfo, setParticipantInfo] = useState<any>([]);
  const { roomId } = useParams();
  const userId = 1;

  useEffect(() => {
    async function getRoomInfo() {
      try {
        //[수정사항] 임시로 userid를 1로 지정. doyun님과 소통 후, 변경 예정
        //[수정사항] 도메인이 아직 확실하지 않아서 보류
        const response = await axios.get(
          `${SERVERURL}/rooms/channel/${roomId}/${userId}`,
        );

        setRoomInfo(response.data);
      } catch (error) {
        alert(error);
        throw console.dir(error);
      }
    }
    getRoomInfo();
  }, [roomId]);

  useEffect(() => {
    async function getDMInfo() {
      try {
        //[수정사항] 임시로 userid를 1로 지정. doyun님과 소통 후, 변경 예정
        //랜더링 시,   "Uncaught" error로 인해 조건을 걸어줌.
        if (roomInfo.type === DM) {
          const response = await axios.get(
            `${SERVERURL}/rooms/${roomId}/dm/${userId}/participants`,
          );
          setDMInfo(response.data);
        }
      } catch (error) {
        alert(error);
        throw console.dir(error);
      }
    }
    getDMInfo();
  }, [roomId]);

  useEffect(() => {
    async function getParticipantInfo() {
      try {
        //[수정사항] 임시로 userid를 1로 지정. doyun님과 소통 후, 변경 예정
        //랜더링 시,   "Uncaught" error로 인해 조건을 걸어줌.
        //5 === 랜더링 안됨.
        if (roomInfo.type !== DM) {
          const response = await axios.get(
            `${SERVERURL}/rooms/${roomId}/channel/${userId}/participants`,
          );
          setParticipantInfo(response.data);
        }
      } catch (error) {
        alert(error);
        throw console.dir(error);
      }
    }
    getParticipantInfo();
  }, [roomId, userId]);

  //[수정사항] any => ChannelDto
  const handleRoomInfo = (roomInfo: any) => {
    setRoomInfo(roomInfo);
  };

  const roomInfoSet: RoomInfoSet = {
    roomInfo: roomInfo,
    DMInfo: DMInfo,
    handler: handleRoomInfo,
  };

  const participantInfoSet: ParticipantInfoSet = {
    participantInfo: participantInfo,
  };

  return (
    <ChattingRoomLayout>
      <EnteredChatRoomInfoOrganisms roomInfoSet={roomInfoSet} />
      <ChatRoomFeaterLayout>
        <ChattingOrganisms />
        {roomInfo.type !== DM && (
          <ChatParticipantsOrganisms participantInfoSet={participantInfoSet} />
        )}
      </ChatRoomFeaterLayout>
    </ChattingRoomLayout>
  );
}

export default EnteredChatRoomTemplate;
