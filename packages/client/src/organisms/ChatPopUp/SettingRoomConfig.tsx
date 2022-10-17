import { Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import SetChatRoomNameModule from '../../molecules/ChatPopUp/SetChatRoomName';
import SetChatRoomTypeModule from '../../molecules/ChatPopUp/SetChatRoomType';
import SetChatRoomPasswordModule from '../../molecules/ChatPopUp/SetChatRoomPassword';
import SetChatRoomInviteModule from '../../molecules/ChatPopUp/SetChatRoomInvite';
import { CreateRoomSet } from '../../types/Room.type';
import { useState } from 'react';
import { SERVERURL } from '../../configs/Link.url';
import axios from 'axios';
import { PROTECTED } from '../../configs/RoomType';
import { useRecoilValue } from 'recoil';
import { userDataAtom } from '../../pages/PingpongRoutePage';

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
  backgroundColor: '#40C6FF',
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

async function createRoom(newRoom: CreateRoomSet) {
  try {
    const response = await axios.post(`${SERVERURL}/rooms/channels`, newRoom);
  } catch (error) {
    console.dir(error);
  }
}

//일단 임시로 prop을 내려서 상태관리함 향후 교체할 예정
function SettingRoomConfigOranisms(closeModal: () => void) {
  //[수정사항] userId => 1
  const userData = useRecoilValue(userDataAtom);
  //[수정사항] 나중에 방의 초기값을 만든사람 이름을 하면 좋을듯
  const [newRoom, setNewRoom] = useState<CreateRoomSet>({
    userId: userData.id,
    name: 'default',
    type: 1,
    salt: '',
    participantIds: [],
  });

  const savehandler = () => {
    console.log('!!', newRoom.type, newRoom.salt);
    if (newRoom.type === 2 && newRoom.salt === '')
      alert('비밀번호를 입력하세요');
    else if (newRoom.participantIds.length === 0)
      alert('인원을 1명 이상 초대하세요');
    else {
      closeModal();
      createRoom(newRoom);
      console.log('send', newRoom);
    }
  };

  const closehandler = () => {
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
    setNewRoom({ ...newRoom, participantIds: value });
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
        <SetChatRoomInviteModule handler={handleParticipant} />
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
