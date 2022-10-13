import { styled } from '@mui/material/styles';
import BlockIcon from '@mui/icons-material/Block';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import PersonIcon from '@mui/icons-material/Person';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userDataAtom } from '../../pages/PingpongRoutePage';
import { CHANNELURL, SERVERURL } from '../../configs/Link.url';
import { CustomIconProps } from '../../types/Link.type';
import CustomIconButton from '../../atoms/button/icon/CustomIconButtion';

const InfoBoxFunctionLayout = styled('div')(({ theme }) => ({
  width: '30%',
  height: '95%',
  flexDirection: 'row-reverse',
  display: 'flex',
  alignItems: 'center',
}));
//향후 상태관리를 추가하여 조건에 따라 아이콘을 보이게 또는 안보이게 처리해줄 것 입니다.
function InfoBoxRoomFunctionModule() {
  const userData = useRecoilValue(userDataAtom);
  const navigate = useNavigate();
  const { roomId } = useParams();

  async function outRoom() {
    try {
      await axios.delete(
        `${SERVERURL}/rooms/${roomId}/channel/participants/${userData.id}`,
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
