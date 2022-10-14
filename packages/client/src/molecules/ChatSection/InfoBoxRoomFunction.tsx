import { styled } from '@mui/material/styles';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userDataAtom } from '../../pages/PingpongRoutePage';
import { CHANNELURL } from '../../configs/Link.url';
import { CustomIconProps } from '../../types/Link.type';
import CustomIconButton from '../../atoms/button/icon/CustomIconButtion';
import useSocket from '../../socket/useSocket';
import { chatNameSpace, deleteChannelParticipant } from '../../socket/event';
import { chatRoomList, unJoinedRoomList } from '../../recoil/chat.recoil';
import { RoomInfoSet, RoomList, UnJoinedRoomList } from '../../types/Room.type';

const InfoBoxFunctionLayout = styled('div')(({ theme }) => ({
  width: '30%',
  height: '95%',
  flexDirection: 'row-reverse',
  display: 'flex',
  alignItems: 'center',
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

  const filterPopRoom = () => {
    return joinedList.filter((room: RoomList) => {
      if (roomId !== undefined) return room.id !== +roomId;
      return false;
    });
  };

  //채팅방을 나가는 작업 네임스페이스(ws://localhost:4242/chat)
  function outRoom() {
    socket.emit(
      `${deleteChannelParticipant}`,
      {
        userId: userData.id,
        roomId: Number(roomId),
      },
      (response: any) => {
        console.log('deleteChannel!! ', response); // "got it"
        //joinedroomlist에서 삭제해야하고, 최초 방목록에도 추가해야함
        //최초 방목록을 전역으로 뺄까 고민중 방을 생성하는 작업을 할때도 마찬가지로 추가를 해줘야하기 때문
        //[수정사항] optimistic UI를 위한 작업
        const RemoveFromJoinedRoom = filterPopRoom();
        console.log(RemoveFromJoinedRoom);
        setJoinedList([...RemoveFromJoinedRoom]);
        const addToUnJoinedRoom: UnJoinedRoomList = {
          ...roomInfo,
        };
        setUnJoinedList([...unJoinedList, addToUnJoinedRoom]);
        navigate(`${CHANNELURL}`);
      },
    );
    socket.on('exception', (response: any) => {
      alert(response.message);
    });
    socket.on('roomMessage', (response: any) => {
      console.log(response);
    });
  }

  const customMeetProps: CustomIconProps = {
    icon: <MeetingRoomIcon />,
    action: outRoom,
  };

  return (
    <InfoBoxFunctionLayout>
      <CustomIconButton customProps={customMeetProps} />
    </InfoBoxFunctionLayout>
  );
}

export default InfoBoxRoomFunctionModule;
