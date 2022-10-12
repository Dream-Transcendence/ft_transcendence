import { styled } from '@mui/material/styles';
import PasswordInput from '../../atoms/input/passwordBox';
import RoomNumberOfPeopleModule from '../../molecules/ChatSection/RoomElementNumOfPeople';
import RoomTitleModule from '../../molecules/ChatSection/RoomElementTitle';
import RoomElementImageModule from '../../molecules/ChatSection/RoomElementImage';
import { LinkTextResource } from '../../types/Link.type';
import LinkPageTextButton from '../../atoms/button/linkPage/LinkPageTextButton';
import { CHATROOMURL, SERVERURL } from '../../configs/Link.url';
import { PROTECTED } from '../../configs/RoomType';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userDataAtom } from '../../pages/PingpongRoutePage';

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

//[수정사항] DTO 확정되면 수정할 것 any => ChannelDto
function ChatRoomElementOrganisms(props: { roomInfo: any }) {
  //chatpage에 있있던  비번 옮겨옴
  const [password, setPassword] = useState('');
  const roomInfo = props.roomInfo;
  const navigate = useNavigate();
  const userData = useRecoilValue(userDataAtom);
  const { id: roomId, name, type, image } = roomInfo;

  const handlePassword = (childData: string) => {
    setPassword(childData);
  };

  async function enterRoom() {
    try {
      const response = await axios.post(
        `${SERVERURL}/rooms/${roomId}/users/${userData.id}`,
        {
          salt: password,
        },
      );
      await navigate(`${CHATROOMURL}${roomId}`);
    } catch (error) {
      alert(error);
      throw console.dir(error);
    }
  }
  //항후, 방 넘버를 토대로 정보를 구성할 것임.
  //api 호출해서 룸 번호 알아냄

  const EnterRoom: LinkTextResource = {
    //데이터에 따라 다른 url
    content: '입장',
    handler: enterRoom,
  };

  return (
    <ChatRoomElementLayout>
      <RoomElementImageModule image={image} />
      <RoomInfoLayout>
        <RoomTitleModule title={name} type={type}></RoomTitleModule>
        {/*[수정사항] id대신 인원수가 들어갈 예정 */}
        <RoomNumberOfPeopleModule num={roomId}></RoomNumberOfPeopleModule>
      </RoomInfoLayout>
      {/* 채팅방 타입에 따라 유연하게 보일 것 */}
      <PasswordInputLayout>
        {type === PROTECTED && <PasswordInput handler={handlePassword} />}
      </PasswordInputLayout>
      {/* [axios POST 요청] 타입에 따라 입장 여부확인(어떤 성격의 채팅방인지 전달) 후, 입장 요청 */}
      <EnterButtonLayout>
        <LinkPageTextButton LinkTextResource={EnterRoom} />
      </EnterButtonLayout>
    </ChatRoomElementLayout>
  );
}

export default ChatRoomElementOrganisms;
