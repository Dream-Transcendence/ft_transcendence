import { styled } from '@mui/material/styles';
import CustomIconButton from '../../components/button/icon/CustomIconButtion';
import BlockIcon from '@mui/icons-material/Block';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import PersonIcon from '@mui/icons-material/Person';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

const InfoBoxFunctionLayout = styled('div')(({ theme }) => ({
  width: '50%',
  height: '95%',
  flexDirection: 'row-reverse',
  display: 'flex',
  alignItems: 'center',
}));

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
