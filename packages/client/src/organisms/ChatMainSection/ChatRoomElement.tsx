import { styled } from '@mui/material/styles';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import PasswordInput from '../../atoms/input/passwordBox';
import TextButton from '../../atoms/button/text/TextButton';
import RoomNumberOfPeopleModule from '../../molecules/ChatSection/RoomElementNumOfPeople';
import RoomTitleModule from '../../molecules/ChatSection/RoomElementTitle';
import RoomElementImageModule from '../../molecules/ChatSection/RoomElementImage';
import { LinkTextResource } from '../../types/Link.type';
import LinkPageTextButton from '../../atoms/button/linkPage/LinkPageTextButton';

const ChatRoomElementLayout = styled('div')(({ theme }) => ({
  width: '98%',
  height: '20%',
  marginBottom: '1%',
  borderRadius: '3px',
  backgroundColor: '#1976D2',
  display: 'flex',
  alignItems: 'center',
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

  const EnterRoom: LinkTextResource = {
    url: '/pingpong/chatroom',
    content: '입장',
  };

  return (
    <ChatRoomElementLayout>
      <RoomElementImageModule image="/static/images/avatar/1.jpg" />
      <RoomInfoLayout>
        <RoomTitleModule title="방 이름"></RoomTitleModule>
        <RoomNumberOfPeopleModule num="6"></RoomNumberOfPeopleModule>
      </RoomInfoLayout>
      <PasswordInputLayout>
        <PasswordInput />
      </PasswordInputLayout>
      <EnterButtonLayout>
        <LinkPageTextButton LinkTextResource={EnterRoom} />
      </EnterButtonLayout>
    </ChatRoomElementLayout>
  );
}

export default ChatRoomElementOrganisms;
