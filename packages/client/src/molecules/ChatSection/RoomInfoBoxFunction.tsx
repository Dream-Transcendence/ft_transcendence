import { styled } from '@mui/material/styles';
import { DM } from '../../configs/RoomType';
import { RoomInfoSet } from '../../types/Room.type';
import InfoDMBoxFunctionModule from './InfoBoxDMFunction';
import InfoBoxRoomFunctionModule from './InfoBoxRoomFunction';

const InfoFunctionLayout = styled('div')(({ theme }) => ({
  width: '30%',
  height: '95%',
}));

//향후 상태관리를 추가하여 조건에 따라 아이콘을 보이게 또는 안보이게 처리해줄 것 입니다.

function InfoBoxFunctionModule(props: { roomInfoSet: RoomInfoSet }) {
  const roomInfoSet = props.roomInfoSet;
  const { roomInfo, handler } = roomInfoSet;
  const { name, type, image } = roomInfo;

  return (
    <InfoFunctionLayout>
      {/* [axios POST 요청]방장이 나갈시, 권한위임 요청 */}
      {/* [axios DELETE 요청]해당 채팅방 나가기 요청 */}
      {type === DM ? (
        <InfoDMBoxFunctionModule roomInfoSet={roomInfoSet} />
      ) : (
        <InfoBoxRoomFunctionModule roomInfoSet={roomInfoSet} />
      )}
    </InfoFunctionLayout>
  );
}

export default InfoBoxFunctionModule;
