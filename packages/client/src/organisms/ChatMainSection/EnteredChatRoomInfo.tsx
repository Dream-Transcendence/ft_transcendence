import { styled } from '@mui/material/styles';
import CustomIconButton from '../../atoms/button/icon/CustomIconButtion';
import InfoChatRoomBoxFunctionModule from 'client/src/molecules/ChatSection/RoomInfoChatRoomBoxFunction';
import InfoEditBoxNameModule from '../../molecules/ChatSection/RoomInfoBoxName';
import InfoBoxPasswordModule from '../../molecules/ChatSection/RoomInfoBoxPassword';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SERVERURL } from '../../configs/Link.url';
import axios from 'axios';

const RoomInfoLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '11%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const RoomInfoBox = styled('div')(({ theme }) => ({
  width: '93%',
  height: '80%',
  display: 'flex',
  marginRight: '1%',
  borderRadius: '15px',
  backgroundColor: '#003566',
}));

function EnteredChatRoomInfoOrganisms() {
  //[수정사항] any => ChannelDto
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
        const response = await axios.get(
          `${SERVERURL}/rooms/channel/${roomId}/1`,
        );
        //response.data의 값을 분석중이었음.20221006
        setRoomInfo(response.data);
        console.log('?????????', response.data);
      } catch (error) {
        throw console.dir(error);
      }
    }
    getRoomInfo();
  }, [roomId]);
  console.log('aaasadas', roomInfo);
  return (
    <RoomInfoLayout>
      <RoomInfoBox>
        {/* [axios GET 요청]해당 채팅방 정보 요청 내부에서 나눠 받을지, 한꺼번에 받을지 고민중 */}
        <InfoEditBoxNameModule roomInfo={roomInfo} />
        <InfoBoxPasswordModule roomInfo={roomInfo} />
        <InfoChatRoomBoxFunctionModule />
      </RoomInfoBox>
    </RoomInfoLayout>
  );
}

export default EnteredChatRoomInfoOrganisms;
