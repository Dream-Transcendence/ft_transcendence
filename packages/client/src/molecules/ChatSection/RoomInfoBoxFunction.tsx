import { styled } from '@mui/material/styles';
import { DM } from '../../configs/RoomType';
import InfoDMBoxFunctionModule from './InfoBoxDMFunction';
import InfoBoxRoomFunctionModule from './InfoBoxRoomFunction';

const InfoFunctionLayout = styled('div')(({ theme }) => ({
  width: '30%',
  height: '95%',
}));

//향후 상태관리를 추가하여 조건에 따라 아이콘을 보이게 또는 안보이게 처리해줄 것 입니다.

function InfoBoxFunctionModule(props: { roomInfo: any }) {
  //[수정사항] 동환님이 유저 작업끝내면 바꿀 것
  const roomInfo = props.roomInfo;
  const { type } = roomInfo;

  return (
    <InfoFunctionLayout>
      {/* [axios POST 요청]방장이 나갈시, 권한위임 요청 */}
      {/* [axios DELETE 요청]해당 채팅방 나가기 요청 */}
      {type === DM ? (
        <InfoDMBoxFunctionModule />
      ) : (
        <InfoBoxRoomFunctionModule />
      )}
    </InfoFunctionLayout>
  );
}

export default InfoBoxFunctionModule;
