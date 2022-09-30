import { styled } from '@mui/material/styles';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import PasswordInput from '../../atoms/input/passwordBox';
import RoomNumberOfPeopleModule from '../../molecules/ChatSection/RoomElementNumOfPeople';
import RoomTitleModule from '../../molecules/ChatSection/RoomElementTitle';
import RoomElementImageModule from '../../molecules/ChatSection/RoomElementImage';
import { LinkTextResource } from '../../types/Link.type';
import LinkPageTextButton from '../../atoms/button/linkPage/LinkPageTextButton';
import { OpenRoomProps } from '../../template/ChatMainSection/ChatRoomListTemplate';
import { CHATROOMURL } from '../../configs/Link.url';

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

function ChatRoomElementOrganisms(props: { openRoomProps: OpenRoomProps }) {
  const { openRoom, setOpenRoom } = props.openRoomProps;

  const openRoomHandler = (): void => {
    setOpenRoom('a');
  };

  const EnterRoom: LinkTextResource = {
    //데이터에 따라 다른 url
    url: CHATROOMURL,
    content: '입장',
    handler: openRoomHandler,
  };

  return (
    <ChatRoomElementLayout>
      <RoomElementImageModule image="/static/images/avatar/1.jpg" />
      <RoomInfoLayout>
        <RoomTitleModule title="방 이름"></RoomTitleModule>
        <RoomNumberOfPeopleModule num="6"></RoomNumberOfPeopleModule>
      </RoomInfoLayout>
      {/* 채팅방 타입에 따라 유연하게 보일 것 */}
      <PasswordInputLayout>
        <PasswordInput />
      </PasswordInputLayout>
      {/* [axios POST 요청] 타입에 따라 입장 여부확인(어떤 성격의 채팅방인지 전달) 후, 입장 요청 */}
      <EnterButtonLayout>
        <LinkPageTextButton LinkTextResource={EnterRoom} />
      </EnterButtonLayout>
    </ChatRoomElementLayout>
  );
}

export default ChatRoomElementOrganisms;
