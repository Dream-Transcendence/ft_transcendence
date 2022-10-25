import { styled } from '@mui/material/styles';
import PasswordInput from '../../atoms/input/passwordBox';
import RoomNumberOfPeopleModule from '../../molecules/ChatSection/RoomElementNumOfPeople';
import RoomTitleModule from '../../molecules/ChatSection/RoomElementTitle';
import RoomElementImageModule from '../../molecules/ChatSection/RoomElementImage';
import { LinkTextResource } from '../../types/Link.type';
import LinkPageTextButton from '../../atoms/button/linkPage/LinkPageTextButton';
import { CHATROOMURL } from '../../configs/Link.url';
import { PROTECTED } from '../../configs/RoomType';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  GetRoomInfoDto,
  RoomList,
  UnJoinedRoomList,
} from '../../types/Room.type';
import useSocket from '../../socket/useSocket';
import { chatNameSpace, ENTERCHANNEL } from '../../socket/event';
import { chatRoomList, unJoinedRoomList } from '../../recoil/chat.recoil';
import { userDataAtom } from '../../recoil/user.recoil';

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

function ChatRoomElementOrganisms(props: { roomInfo: GetRoomInfoDto }) {
  //chatpage에 있있던  비번 옮겨옴
  const [password, setPassword] = useState('');
  const roomInfo = props.roomInfo;
  const navigate = useNavigate();
  const userData = useRecoilValue(userDataAtom);
  const [socket] = useSocket(chatNameSpace);
  const { id: roomId, name, type, image, personnel } = roomInfo;
  const [joinedRoomList, setJoinedRoomList] = useRecoilState(chatRoomList);
  const [unJoinedList, setUnJoinedList] = useRecoilState(unJoinedRoomList);

  const handlePassword = (childData: string) => {
    setPassword(childData);
  };

  const filterPopRoom = () => {
    return unJoinedList.filter((room: UnJoinedRoomList) => {
      if (roomId !== undefined) return room.id !== +roomId;
      return false;
    });
  };
  //하나로 합칠까? enterRoom에 파라미터를 주고 action을 하나로 주면 관리하기 쉬울 것 같기도?
  //리스트에 데이터를 추가하는 기능때문에 합치기는 까다로울듯?
  function enterRoom() {
    //채팅방을 들어가는 작업 네임스페이스(ws://localhost:4242/chat)
    socket.emit(
      `${ENTERCHANNEL}`,
      {
        userId: userData.id,
        roomId: roomId,
        salt: password,
      },
      (response: any) => {
        console.log('enter new room success ', response); // "got it"
        //임시 데이터 생성
        const newRoom: RoomList = { ...roomInfo, recvMessageCount: 0 };
        setJoinedRoomList([...joinedRoomList, newRoom]);
        setUnJoinedList([...filterPopRoom()]); //버튼클릭고장
        navigate(`${CHATROOMURL}${roomId}`);
      },
    );
    //방을 잘못 들어갈 경우 에러처리
    socket.on('exception', (response: any) => {
      alert(response.message);
    });
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
        <RoomNumberOfPeopleModule num={personnel}></RoomNumberOfPeopleModule>
      </RoomInfoLayout>
      {/* 채팅방 타입에 따라 유연하게 보일 것 */}
      <PasswordInputLayout>
        {type === PROTECTED && <PasswordInput handler={handlePassword} />}
      </PasswordInputLayout>
      <EnterButtonLayout>
        <LinkPageTextButton LinkTextResource={EnterRoom} />
      </EnterButtonLayout>
    </ChatRoomElementLayout>
  );
}

export default ChatRoomElementOrganisms;
