import { Typography, ThemeProvider, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import PasswordInput from '../../components/input/passwordBox';
import TextButton from '../../components/button/text/TextButton';
import RoomNumberOfPeopleModule from '../../modules/ChatSection/RoomElementNumOfPeople';
import RoomTitleModule from '../../modules/ChatSection/RoomElementTitle';

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
  border: 'solid',
}));

const RoomInfoLayout = styled('div')(({ theme }) => ({
  width: '45%',
  height: '90%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const PasswordInputLayout = styled('div')(({ theme }) => ({
  width: '15%',
  height: '40%',
}));

const EnterButtonLayout = styled('div')(({ theme }) => ({
  width: '15%',
  height: '40%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

function ChatRoomElementOrganisms() {
  let theme = createTheme();
  theme = responsiveFontSizes(theme); //반응형을 위해 사용

  return (
    <ChatRoomElementLayout>
      <ProfileLayout></ProfileLayout>
      <RoomInfoLayout>
        <RoomTitleModule title="방 이름"></RoomTitleModule>
        <RoomNumberOfPeopleModule num="6"></RoomNumberOfPeopleModule>
      </RoomInfoLayout>
      <PasswordInputLayout>
        <PasswordInput></PasswordInput>
      </PasswordInputLayout>
      <EnterButtonLayout>
        <TextButton content="입장"></TextButton>
      </EnterButtonLayout>
    </ChatRoomElementLayout>
  );
}

export default ChatRoomElementOrganisms;
