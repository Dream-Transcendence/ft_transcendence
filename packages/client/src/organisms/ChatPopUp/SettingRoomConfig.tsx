import { Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const SettingRoomConfigLayout = styled('div')(({ theme }) => ({
  width: '30%',
  height: '80%',
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
function SettingRoomConfigOranisms() {
  return (
    <SettingRoomConfigLayout>
      <SettingRoomConfigBox>
        <Typography marginBottom={3}>채팅방 생성</Typography>
        <SetNameLayout></SetNameLayout>
        <SetTypeLayout></SetTypeLayout>
        <SetPasswordLayout></SetPasswordLayout>
        <SetInviteLayout></SetInviteLayout>
        <Button variant="contained">저장하기</Button>
      </SettingRoomConfigBox>
    </SettingRoomConfigLayout>
  );
}

export default SettingRoomConfigOranisms;
