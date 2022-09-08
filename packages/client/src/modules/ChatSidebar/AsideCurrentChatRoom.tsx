import { styled } from '@mui/material/styles';

const CurrentChatRoomLayout = styled('div')(({ theme }) => ({
  height: '11.3%',
  display: 'flex',
  justifyContent: 'center',
}));

const CurrentChatRoomBox = styled('div')(({ theme }) => ({
  marginTop: '3%',
  marginBottom: '3%',
  height: '87%',
  width: '90%',
  borderRadius: '13px',
  backgroundColor: '#001D3D',
}));

function AsideCurrentChatRoomModule() {
  return (
    <CurrentChatRoomLayout>
      <CurrentChatRoomBox></CurrentChatRoomBox>
    </CurrentChatRoomLayout>
  );
}

export default AsideCurrentChatRoomModule;
