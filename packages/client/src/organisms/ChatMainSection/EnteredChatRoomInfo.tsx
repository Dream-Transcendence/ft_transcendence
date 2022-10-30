import { styled } from '@mui/material/styles';
import InfoEditBoxNameModule from '../../molecules/ChatSection/RoomInfoBoxName';
import InfoBoxPasswordModule from '../../molecules/ChatSection/RoomInfoBoxPassword';
import { SERVERURL } from '../../configs/Link.url';
import axios from 'axios';
import { GetRoomInfoDto, RoomInfoSet } from '../../types/Room.type';
import InfoBoxRoomFunctionModule from '../../molecules/ChatSection/InfoBoxRoomFunction';
import useSocket from '../../socket/useSocket';
import { chatNameSpace } from '../../socket/event';
import { useRecoilValue } from 'recoil';
import InfoBoxFunctionModule from '../../molecules/ChatSection/RoomInfoBoxFunction';

const RoomInfoLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '11%',
  minHeight: '100px',
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
  background: 'linear-gradient(to bottom right, #f796c033, #76aef177)',
}));

/*
 * 채팅정보를 수정하기 위한 공통 커스텀 훅
 */
export const ChangeRoomInfo = async (roomInfoSet: RoomInfoSet) => {
  try {
    const { roomInfo, roomId, handler } = roomInfoSet;
    const response = await axios.patch(
      `${SERVERURL}/rooms/${roomId}`,
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
      roomInfo['salt'] !== ''
    ) {
      const room: any = { ...roomInfo, type: 2 };
      await handler(room);
    }
    return await response.status;
  } catch (error) {
    alert(error);
    throw await console.dir(error);
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
