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
import { userDataAtom } from '../../pages/PingpongRoutePage';
import InfoBoxFunctionModule from '../../molecules/ChatSection/RoomInfoBoxFunction';

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

/*
 * 채팅정보를 수정하기 위한 공통 커스텀 훅
 */
//[수정사항] 비밀번호 변경 성공, 향후 손캉님이 공백 보낼 때, type변경해주는 로직 고쳐주면 아이콘 자동변환되게 바꿀 것
export const ChangeRoomInfo = async (roomInfoSet: RoomInfoSet) => {
  //[수정사항] userId임시 1
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
