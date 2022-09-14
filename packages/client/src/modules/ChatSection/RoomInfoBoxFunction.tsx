import { styled } from '@mui/material/styles';
import CustomIconButton from '../../components/button/icon/CustomIconButtion';
import BlockIcon from '@mui/icons-material/Block';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import PersonIcon from '@mui/icons-material/Person';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PasswordInput from '../../components/input/passwordBox';

const InfoBoxFunctionLayout = styled('div')(({ theme }) => ({
  width: '30%',
  height: '95%',
  flexDirection: 'row-reverse',
  display: 'flex',
  alignItems: 'center',
}));
//향후 상태관리를 추가하여 조건에 따라 아이콘을 보이게 또는 안보이게 처리해줄 것 입니다.
function InfoBoxFunctionModule() {
  return (
    <InfoBoxFunctionLayout>
      {CustomIconButton(<MeetingRoomIcon />)}
      {CustomIconButton(<BlockIcon />)}
      {CustomIconButton(<SportsKabaddiIcon />)}
      {CustomIconButton(<PersonIcon />)}
    </InfoBoxFunctionLayout>
  );
}

export default InfoBoxFunctionModule;
