import { styled } from '@mui/material/styles';
import CustomIconButton from '../../atoms/button/icon/CustomIconButtion';
import InfoDMBoxFunctionModule from 'client/src/molecules/ChatSection/RoomInfoDMBoxFunction';
import InfoBoxNameModule from '../../molecules/ChatSection/RoomInfoBoxName';

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
        {/* <InfoBoxNameModule /> */}
        <InfoDMBoxFunctionModule />
      </RoomInfoBox>
    </RoomInfoLayout>
  );
}

export default EnteredDMInfoOrganisms;
