import { styled } from '@mui/material/styles';
import CustomIconButton from '../../atoms/button/icon/CustomIconButtion';
import InfoBoxFunctionModule from '../../modules/ChatSection/RoomInfoBoxFunction';
import InfoBoxNameModule from '../../modules/ChatSection/RoomInfoBoxName';
import InfoBoxPasswordModule from '../../modules/ChatSection/RoomInfoBoxPassword';

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

function EnteredRoomInfoOrganisms() {
  return (
    <RoomInfoLayout>
      <RoomInfoBox>
        <InfoBoxNameModule />
        <InfoBoxPasswordModule />
        <InfoBoxFunctionModule />
      </RoomInfoBox>
    </RoomInfoLayout>
  );
}

export default EnteredRoomInfoOrganisms;
