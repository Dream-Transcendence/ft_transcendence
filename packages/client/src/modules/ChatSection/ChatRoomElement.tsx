import { styled } from '@mui/material/styles';
import RoomOutIconButton from '../../components/button/icon/ChatRoomOutIconButton';

const ChatRoomElementLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '11%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

function ChatRoomElementModule() {
  return <ChatRoomElementLayout></ChatRoomElementLayout>;
}

export default ChatRoomElementModule;
