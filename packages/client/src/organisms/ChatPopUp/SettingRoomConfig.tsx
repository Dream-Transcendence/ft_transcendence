import { Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import SetChatRoomNameModule from '../../molecules/ChatPopUp/SetChatRoomName';
import SetChatRoomTypeModule from '../../molecules/ChatPopUp/SetChatRoomType';
import SetChatRoomPasswordModule from '../../molecules/ChatPopUp/SetChatRoomPassword';
import SetChatRoomInviteModule from '../../molecules/ChatPopUp/SetChatRoomInvite';
import {
  CreateRoomSet,
  HandleInviteList,
  RoomList,
} from '../../types/Room.type';
import { useState } from 'react';
import { CHATROOMURL, SERVERURL } from '../../configs/Link.url';
import axios from 'axios';
import { PROTECTED } from '../../configs/RoomType';
import { useRecoilState, useRecoilValue } from 'recoil';
import { chatRoomList, newParticipant } from '../../recoil/chat.recoil';
import { useNavigate } from 'react-router-dom';
import { userDataAtom } from '../../recoil/user.recoil';
import useSocket from '../../socket/useSocket';
import { chatNameSpace, ENTERCHANNEL } from '../../socket/event';

const SettingRoomConfigLayout = styled('div')(({ theme }) => ({
  width: '30%',
  height: '80%',
  minWidth: '400px',
  minHeight: '800px',
}));

const SettingRoomConfigBox = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  borderRadius: '10px',
  background:
    'linear-gradient(135deg,rgba(110,177,255,1) 0%,rgba(118,0,255,1) 200%)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

const SetButtonLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '5%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  justifyItems: 'center',
}));

//일단 임시로 prop을 내려서 상태관리함 향후 교체할 예정
function SettingRoomConfigOranisms(closeModal: () => void) {
  const userData = useRecoilValue(userDataAtom);
  const [joinedChatRoom, setJoinedChatRoom] = useRecoilState(chatRoomList);
  const [socket] = useSocket(chatNameSpace);
  //[수정사항] 나중에 방의 초기값을 만든사람 이름을 하면 좋을듯
  const [newRoom, setNewRoom] = useState<CreateRoomSet>({
    userId: userData.id,
    name: 'default',
    type: 1,
    salt: '',
    participantIds: [],
  });
  const [addedParticipantList, setAddedParticipantList] = useState<RoomList[]>(
    [],
  );
  const [newParticipantList, setNewParticipantList] =
    useRecoilState(newParticipant);
  const navigate = useNavigate();

  async function createRoom(newRoom: CreateRoomSet) {
    try {
      await axios.post(`${SERVERURL}/rooms/channels`, newRoom).then((res) => {
        setNewRoom({
          userId: userData.id,
          name: '',
          type: 1,
          salt: '',
          participantIds: [],
        });
        const joinedRoom: RoomList = {
          id: res.data.id,
          name: newRoom.name,
          image: '',
          recvMessageCount: 0,
        };
        setJoinedChatRoom([...joinedChatRoom, joinedRoom]);
        resetAddedParticipantList();
        socket.emit(
          `${ENTERCHANNEL}`,
          {
            userId: userData.id,
            roomId: res.data.id,
          },
          (response: any) => {
            console.log('enter room success ', response);
            navigate(`/pingpong/channel/room/${res.data.id}`);
          },
        );
        navigate(`${CHATROOMURL}${res.data.id}`);
      });
    } catch (error) {
      console.dir(error);
    }
  }

  const savehandler = () => {
    if (newRoom.type === 2 && newRoom.salt === '')
      alert('비밀번호를 입력하세요');
    else if (newRoom.participantIds.length === 0)
      alert('인원을 1명 이상 초대하세요');
    else {
      createRoom(newRoom);
      closeModal();
    }
  };

  const resetAddedParticipantList = () => {
    setAddedParticipantList([]);
    setNewParticipantList([]);
  };

  const closehandler = () => {
    resetAddedParticipantList();
    closeModal();
  };

  const handlePassword = (value: string) => {
    setNewRoom({ ...newRoom, salt: value });
  };

  const handleType = (value: number) => {
    setNewRoom({ ...newRoom, type: value });
  };

  const handleName = (value: string) => {
    setNewRoom({ ...newRoom, name: value });
  };

  const handleParticipant = (value: number[]) => {
    //배열은 깊은 복사해야함
    const deepCopyRoom = { ...newRoom };
    deepCopyRoom.participantIds = [...value];
    setNewRoom({ ...deepCopyRoom });
  };

  const handleInviteList: HandleInviteList = {
    handleParticipant: handleParticipant,
    newParticipantList: newParticipantList,
    setNewParticipantList: setNewParticipantList,
  };
  return (
    <SettingRoomConfigLayout>
      <SettingRoomConfigBox>
        <Typography variant="h4" marginBottom={2}>
          채팅방 생성
        </Typography>
        <SetChatRoomNameModule handler={handleName} />
        <SetChatRoomTypeModule handler={handleType} />
        {newRoom.type === PROTECTED && (
          <SetChatRoomPasswordModule handler={handlePassword} />
        )}
        <SetChatRoomInviteModule handleInviteList={handleInviteList} />
        {/* [axios POST 요청] 위 정보를 포함한 채팅방 개설 */}
        <SetButtonLayout>
          <Button onClick={savehandler} variant="contained">
            저장하기
          </Button>
          <Button onClick={closehandler} variant="contained">
            나가기
          </Button>
        </SetButtonLayout>
      </SettingRoomConfigBox>
    </SettingRoomConfigLayout>
  );
}

export default SettingRoomConfigOranisms;
