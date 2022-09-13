import { styled } from '@mui/material/styles';
import CustomIconButton from '../../components/button/icon/CustomIconButtion';
import BlockIcon from '@mui/icons-material/Block';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import PersonIcon from '@mui/icons-material/Person';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

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

const InfoBoxFunctionLayout = styled('div')(({ theme }) => ({
  width: '50%',
  height: '95%',
  flexDirection: 'row-reverse',
  display: 'flex',
  alignItems: 'center',
}));

const InfoBoxNameLayout = styled('div')(({ theme }) => ({
  width: '50%',
  height: '95%',
}));

function EnteredRoomInfoModule() {
  return (
    <RoomInfoLayout>
      <RoomInfoBox>
        <InfoBoxNameLayout></InfoBoxNameLayout>
        <InfoBoxFunctionLayout>
          {CustomIconButton(<MeetingRoomIcon />)}
          {CustomIconButton(<BlockIcon />)}
          {CustomIconButton(<SportsKabaddiIcon />)}
          {CustomIconButton(<PersonIcon />)}
        </InfoBoxFunctionLayout>
      </RoomInfoBox>
    </RoomInfoLayout>
  );
}

export default EnteredRoomInfoModule;
