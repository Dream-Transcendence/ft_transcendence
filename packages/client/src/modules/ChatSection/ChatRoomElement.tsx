import { styled } from '@mui/material/styles';
import RoomOutIconButton from '../../components/button/icon/ChatRoomOutIconButton';

const ChatRoomElementLayout = styled('div')(({ theme }) => ({
  width: '98%',
  height: '20%',
  marginBottom: '1%',
  borderRadius: '3px',
  backgroundColor: '#1976D2',
  display: 'flex',
  alignItems: 'center',
}));

const ProfileLayout = styled('div')(({ theme }) => ({
  width: '25%',
  height: '40%',
  border: 'solid 1px',
}));

const RoomInfoLayout = styled('div')(({ theme }) => ({
  width: '45%',
  height: '90%',
  display: 'flex',
  border: 'solid 1px',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const RoomTitleLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '60%',
  border: 'solid 1px',
}));

const RoomNumberOfPeopleLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '40%',
  border: 'solid 1px',
}));

const PasswordInputLayout = styled('div')(({ theme }) => ({
  width: '15%',
  height: '40%',
  border: 'solid 1px',
}));

const EnterButtonLayout = styled('div')(({ theme }) => ({
  width: '15%',
  height: '40%',
  border: 'solid 1px',
}));

function ChatRoomElementModule() {
  return (
    <ChatRoomElementLayout>
      <ProfileLayout></ProfileLayout>
      <RoomInfoLayout>
        <RoomTitleLayout></RoomTitleLayout>
        <RoomNumberOfPeopleLayout></RoomNumberOfPeopleLayout>
      </RoomInfoLayout>
      <PasswordInputLayout></PasswordInputLayout>
      <EnterButtonLayout></EnterButtonLayout>
    </ChatRoomElementLayout>
  );
}

export default ChatRoomElementModule;
