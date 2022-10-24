import { styled } from '@mui/material/styles';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CHANNELURL } from '../../configs/Link.url';
import { CustomIconProps } from '../../types/Link.type';
import CustomIconButton from '../../atoms/button/icon/CustomIconButtion';
import useSocket from '../../socket/useSocket';
import { chatNameSpace, DELETECHANNELPARTICIPANT } from '../../socket/event';
import { chatRoomList, unJoinedRoomList } from '../../recoil/chat.recoil';
import { RoomInfoSet, RoomList, UnJoinedRoomList } from '../../types/Room.type';
import { userDataAtom } from '../../recoil/user.recoil';

const InfoBoxFunctionLayout = styled('div')(({ theme }) => ({
  width: '30%',
  height: '95%',
  flexDirection: 'row-reverse',
  display: 'flex',
  alignItems: 'center',
  float: 'right',
}));
//향후 상태관리를 추가하여 조건에 따라 아이콘을 보이게 또는 안보이게 처리해줄 것 입니다.
function InfoBoxRoomFunctionModule(props: { roomInfoSet: RoomInfoSet }) {
  const roomInfoSet = props.roomInfoSet;
  const { roomInfo } = roomInfoSet;
  const userData = useRecoilValue(userDataAtom);
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [socket] = useSocket(chatNameSpace);
  const [unJoinedList, setUnJoinedList] = useRecoilState(unJoinedRoomList);
  const [joinedList, setJoinedList] = useRecoilState(chatRoomList);

  const filterPopJoinedRoom = () => {
    return joinedList.filter((room: RoomList) => {
      if (roomId !== undefined) return room.id !== +roomId;
      return false;
    });
  };

  const filterPopUnJoinedRoom = () => {
    return unJoinedList.filter((room: UnJoinedRoomList) => {
      if (roomId !== undefined) return room.id !== +roomId;
      return false;
    });
  };

  //채팅방을 나가는 작업 네임스페이스(ws://localhost:4242/chat)
  function outRoom() {
    socket.emit(
      `${DELETECHANNELPARTICIPANT}`,
      {
        userId: userData.id,
        roomId: Number(roomId),
      },
      (response: any) => {
        console.log('deleteChannel!! ', response); // "got it"
        const RemoveFromJoinedRoom = filterPopJoinedRoom();
        setJoinedList([...RemoveFromJoinedRoom]);
        const addToUnJoinedRoom: UnJoinedRoomList = {
          ...roomInfo,
          personnel: roomInfo.personnel - 1,
        };
        setUnJoinedList([...filterPopUnJoinedRoom(), addToUnJoinedRoom]);
        navigate(`${CHANNELURL}`);
      },
    );
    socket.on('exception', (response: any) => {
      alert(response.message);
    });
    // socket.on('roomMessage', (response: any) => {
    //   console.log(response);
    // });
  }

  const outRoomProps: CustomIconProps = {
    icon: <MeetingRoomIcon />,
    action: outRoom,
  };

  return (
    <InfoBoxFunctionLayout>
      <CustomIconButton customProps={outRoomProps} />
    </InfoBoxFunctionLayout>
  );
}

export default InfoBoxRoomFunctionModule;
