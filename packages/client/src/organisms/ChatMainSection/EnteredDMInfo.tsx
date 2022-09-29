import { styled } from '@mui/material/styles';
import CustomIconButton from '../../atoms/button/icon/CustomIconButtion';
import InfoBoxFunctionModule from '../../molecules/ChatSection/RoomInfoBoxFunction';
import InfoBoxNameModule from '../../molecules/ChatSection/RoomInfoBoxName';
import InfoBoxPasswordModule from '../../molecules/ChatSection/RoomInfoBoxPassword';

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

function EnteredDMInfoOrganisms() {
  return (
    <RoomInfoLayout>
      <RoomInfoBox>
        {/* [axios GET 요청]해당 채팅방 정보 요청 */}
        <InfoBoxNameModule />
        <InfoBoxFunctionModule />
      </RoomInfoBox>
    </RoomInfoLayout>
  );
}

export default EnteredDMInfoOrganisms;
