import { styled } from '@mui/material/styles';
import InfoEditBoxNameModule from '../../molecules/ChatSection/RoomInfoBoxName';
import InfoBoxPasswordModule from '../../molecules/ChatSection/RoomInfoBoxPassword';
import axios from 'axios';
import { GetRoomInfoDto, RoomInfoSet } from '../../types/Room.type';
import InfoBoxFunctionModule from '../../molecules/ChatSection/RoomInfoBoxFunction';
import { PROTECTED } from '../../configs/RoomType';

const RoomInfoLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '11%',
  minHeight: '100px',
  maxHeight: '110px',
  marginTop: '1%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const RoomInfoBox = styled('div')(({ theme }) => ({
  width: '93%',
  height: '80%',
  minHeight: '100px',
  maxHeight: '110px',
  display: 'flex',
  marginRight: '1%',
  borderRadius: '15px',
  background: 'linear-gradient(to bottom right, #f796c033, #76aef177)',
}));

/*
 * 채팅정보를 수정하기 위한 공통 커스텀 훅
 */
export const ChangeRoomInfo = async (roomInfoSet: RoomInfoSet) => {
  try {
    const { roomInfo, roomId, handler } = roomInfoSet;
    const response = await axios.patch(
      `${process.env.REACT_APP_SERVER_URL}/rooms/${roomId}`,
      roomInfo,
    );
    //optimistic UI를 위해 즉시 적용
    if (
      response.status === 200 &&
      handler !== undefined &&
      roomInfo['salt'] === ''
    ) {
      const room: GetRoomInfoDto = { ...roomInfo, type: 1 };
      await handler(room);
    } else if (
      response.status === 200 &&
      handler !== undefined &&
      roomInfo['salt'] &&
      roomInfo['salt'] !== ''
    ) {
      const room: any = { ...roomInfo, type: PROTECTED };
      await handler(room);
    }
    return await response.status;
  } catch (error) {
    alert(error);
  }
};

function EnteredChatRoomInfoOrganisms(props: { roomInfoSet: RoomInfoSet }) {
  const roomInfoSet = props.roomInfoSet;

  return (
    <RoomInfoLayout>
      <RoomInfoBox>
        <InfoEditBoxNameModule roomInfoSet={roomInfoSet} />
        <InfoBoxPasswordModule roomInfoSet={roomInfoSet} />
        <InfoBoxFunctionModule roomInfoSet={roomInfoSet} />
      </RoomInfoBox>
    </RoomInfoLayout>
  );
}

export default EnteredChatRoomInfoOrganisms;
