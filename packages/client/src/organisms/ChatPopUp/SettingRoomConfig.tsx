import { Typography, Button, TextField, Input } from '@mui/material';
import { styled } from '@mui/material/styles';
import SetChatRoomNameModule from '../../modules/ChatPopUp/SetChatRoomName';
import RadioGroupButton from '../../components/radio/RadioGroupButton';
import SetChatRoomTypeModule from '../../modules/ChatPopUp/SetChatRoomType';
import SetChatRoomPasswordModule from '../../modules/ChatPopUp/SetChatRoomPassword';
import SetChatRoomInviteModule from '../../modules/ChatPopUp/SetChatRoomInvite';

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

const SetNameLayout = styled('div')(({ theme }) => ({
  width: '90%',
  height: '15%',
  border: 'solid 1px',
  borderRadius: '10px',
  marginBottom: '1%',
}));

const SetTypeLayout = styled('div')(({ theme }) => ({
  width: '90%',
  height: '15%',
  border: 'solid 1px',
  borderRadius: '10px',
  marginBottom: '1%',
}));

const SetPasswordLayout = styled('div')(({ theme }) => ({
  width: '90%',
  height: '15%',
  border: 'solid 1px',
  borderRadius: '10px',
  marginBottom: '1%',
}));

const SetInviteLayout = styled('div')(({ theme }) => ({
  width: '90%',
  height: '30%',
  border: 'solid 1px',
  borderRadius: '10px',
  marginBottom: '3%',
}));

//일단 임시로 prop을 내려서 상태관리함 향후 교체할 예정
function SettingRoomConfigOranisms(click: React.MouseEventHandler) {
  return (
    <SettingRoomConfigLayout>
      <SettingRoomConfigBox>
        <Typography variant="h4" marginBottom={2}>
          채팅방 생성
        </Typography>
        <SetChatRoomNameModule />
        <SetChatRoomTypeModule />
        <SetChatRoomPasswordModule />
        <SetChatRoomInviteModule />
        <Button onClick={click} variant="contained">
          저장하기
        </Button>
      </SettingRoomConfigBox>
    </SettingRoomConfigLayout>
  );
}

export default SettingRoomConfigOranisms;
