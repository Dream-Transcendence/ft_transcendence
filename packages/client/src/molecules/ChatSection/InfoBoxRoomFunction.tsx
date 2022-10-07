import { styled } from '@mui/material/styles';
import CustomIconButton from 'client/src/atoms/button/icon/CustomIconButtion';
import BlockIcon from '@mui/icons-material/Block';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import PersonIcon from '@mui/icons-material/Person';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PasswordInput from 'client/src/atoms/input/passwordBox';
import {
  CustomIconProps,
  LinkIconProps,
  LinkIconResource,
} from 'client/src/types/Link.type';
import LinkPageIconButton from 'client/src/atoms/button/linkPage/LinkPageIconButton';
import {
  CHANNELURL,
  OTHERPROFILEURL,
  SERVERURL,
} from 'client/src/configs/Link.url';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const InfoBoxFunctionLayout = styled('div')(({ theme }) => ({
  width: '30%',
  height: '95%',
  flexDirection: 'row-reverse',
  display: 'flex',
  alignItems: 'center',
}));
//향후 상태관리를 추가하여 조건에 따라 아이콘을 보이게 또는 안보이게 처리해줄 것 입니다.
function InfoBoxRoomFunctionModule() {
  //[수정사항] 동환님이 유저 작업끝내면 바꿀 것
  const userId = 1;
  const navigate = useNavigate();
  const { roomId } = useParams();

  async function outRoom() {
    try {
      //[수정사항] 임시로 userid를 1로 지정. doyun님과 소통 후, 변경 예정
      await axios.delete(
        `${SERVERURL}/rooms/${roomId}/channel/participants/${userId}`,
      );
      navigate(`${CHANNELURL}`);
    } catch (error) {
      alert(error);
      throw console.dir(error);
    }
  }

  const customMeetProps: CustomIconProps = {
    icon: <MeetingRoomIcon />,
    action: outRoom,
  };

  return (
    <InfoBoxFunctionLayout>
      <CustomIconButton customProps={customMeetProps} />
    </InfoBoxFunctionLayout>
  );
}

export default InfoBoxRoomFunctionModule;
