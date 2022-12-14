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
import { RoomList, UnJoinedRoomList } from '../../types/Room.type';
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
  boxShadow: '2px 2px 2px 1px #03008855',
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

function ChatRoomElementOrganisms(props: { roomInfo: UnJoinedRoomList }) {
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
  const enterRoom = () => {
    //채팅방을 들어가는 작업 네임스페이스(ws://localhost:4242/chat)
    socket.emit(
      `${ENTERCHANNEL}`,
      {
        userId: userData.id,
        roomId: roomId,
        salt: password,
      },
      (response: any) => {
        //임시 데이터 생성
        const newRoom: RoomList = { ...roomInfo, recvMessageCount: 0 };
        setJoinedRoomList([...joinedRoomList, newRoom]);
        setUnJoinedList([...filterPopRoom()]);
        navigate(`${CHATROOMURL}${roomId}`);
      },
    );
  };

  const EnterRoom: LinkTextResource = {
    //데이터에 따라 다른 url
    content: '입장',
    handler: enterRoom,
    style: {
      background: 'linear-gradient(to bottom right, #f796c0, #76aef1)',
      fontFamily: 'Lato, sans-serif',
      fontWeight: 500,
      marginTop: '-10%',
      borderRadius: '5px',
      boxShadow: '0 5px 7px #00000022',
      padding: '10px 7px',
      fontSize: '13px',
      border: 'none',
      color: 'whitesmoke',
      transition: '0.25s',
      '&:hover': {
        letterSpacing: '1px',
        transform: [{ scale: 5 }], //잘 작동이안됨
        cursor: 'pointer',
      },
    },
  };

  const handlePasswordSet = {
    handlePassword: handlePassword,
  };

  return (
    <ChatRoomElementLayout>
      <RoomElementImageModule image={image} />
      <RoomInfoLayout>
        <RoomTitleModule title={name} type={type}></RoomTitleModule>
        <RoomNumberOfPeopleModule num={personnel}></RoomNumberOfPeopleModule>
      </RoomInfoLayout>
      <PasswordInputLayout>
        {type === PROTECTED && <PasswordInput handlers={handlePasswordSet} />}
      </PasswordInputLayout>
      <EnterButtonLayout>
        <LinkPageTextButton LinkTextResource={EnterRoom} />
      </EnterButtonLayout>
    </ChatRoomElementLayout>
  );
}

export default ChatRoomElementOrganisms;
