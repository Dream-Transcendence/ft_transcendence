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
  const [roomInfo, setRoomInfo] = useState<any>({
    name: '',
    type: 0,
    image: '',
  });
  const { roomId } = useParams();

  useEffect(() => {
    async function getRoomInfo() {
      try {
        //[수정사항] 임시로 userid를 1로 지정. doyun님과 소통 후, 변경 예정
        //[수정사항] 도메인이 아직 확실하지 않아서 보류
        const response = await axios.get(
          `${SERVERURL}/rooms/channel/${roomId}/1`,
        );
        setRoomInfo(response.data);
      } catch (error) {
        alert(error);
        throw console.dir(error);
      }
    }
    getRoomInfo();
  }, [roomId]);

  //[수정사항] any => ChannelDto
  const handleRoomInfo = (roomInfo: any) => {
    setRoomInfo(roomInfo);
  };

  const roomInfoSet: RoomInfoSet = {
    roomInfo: roomInfo,
    handler: handleRoomInfo,
  };

  return (
    <ChattingRoomLayout>
      <EnteredChatRoomInfoOrganisms roomInfoSet={roomInfoSet} />
      <ChatRoomFeaterLayout>
        <ChattingOrganisms />
        {roomInfo.type !== DM && <ChatParticipantsOrganisms />}
      </ChatRoomFeaterLayout>
    </ChattingRoomLayout>
  );
}

export default EnteredChatRoomTemplate;
