import { styled } from '@mui/material/styles';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import PasswordInput from '../../atoms/input/passwordBox';
import RoomNumberOfPeopleModule from '../../molecules/ChatSection/RoomElementNumOfPeople';
import RoomTitleModule from '../../molecules/ChatSection/RoomElementTitle';
import RoomElementImageModule from '../../molecules/ChatSection/RoomElementImage';
import { LinkTextResource } from '../../types/Link.type';
import LinkPageTextButton from '../../atoms/button/linkPage/LinkPageTextButton';
import { CHATROOMURL } from '../../configs/Link.url';
import { useRecoilState, useSetRecoilState } from 'recoil';

const ChatRoomElementLayout = styled('div')(({ theme }) => ({
  width: '98%',
  height: '100%',
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
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

//DTO 확정되면 수정할 것 ChannelDto
function ChatRoomElementOrganisms(roomInfo: any) {
  //항후, 방 넘버를 토대로 정보를 구성할 것임.
  //api 호출해서 룸 번호 알아냄
  const rooms = roomInfo.roomInfo;

  const { id, name, type, image } = rooms;
  const EnterRoom: LinkTextResource = {
    //데이터에 따라 다른 url
    url: CHATROOMURL + '1',
    content: '입장',
  };

  return (
    <ChatRoomElementLayout>
      <RoomElementImageModule image="/static/images/avatar/1.jpg" />
      <RoomInfoLayout>
        <RoomTitleModule title={name}></RoomTitleModule>
        <RoomNumberOfPeopleModule num="6"></RoomNumberOfPeopleModule>
      </RoomInfoLayout>
      {/* 채팅방 타입에 따라 유연하게 보일 것 */}
      {type === 0 && (
        <PasswordInputLayout>
          <PasswordInput />
        </PasswordInputLayout>
      )}
      {/* [axios POST 요청] 타입에 따라 입장 여부확인(어떤 성격의 채팅방인지 전달) 후, 입장 요청 */}
      <EnterButtonLayout>
        <LinkPageTextButton LinkTextResource={EnterRoom} />
      </EnterButtonLayout>
    </ChatRoomElementLayout>
  );
}

export default ChatRoomElementOrganisms;
