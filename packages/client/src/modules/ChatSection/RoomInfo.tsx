import { styled } from '@mui/material/styles';
import RoomOutIconButton from '../../components/button/icon/ChatRoomOutIconButton';

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

function RoomInfoModule() {
  return (
    <RoomInfoLayout>
      <RoomInfoBox>
        <InfoBoxNameLayout></InfoBoxNameLayout>
        <InfoBoxFunctionLayout>
          <RoomOutIconButton />
        </InfoBoxFunctionLayout>
      </RoomInfoBox>
    </RoomInfoLayout>
  );
}

export default RoomInfoModule;
