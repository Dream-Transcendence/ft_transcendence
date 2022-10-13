import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import StarRateIcon from '@mui/icons-material/StarRate';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { useRecoilValue } from 'recoil';
import { OWNER } from '../../configs/userType';
import { userAuth } from '../../recoil/chat.recoil';

const AdminActions = [
  { icon: <RemoveCircleIcon />, name: 'User Ban' },
  { icon: <VolumeOffIcon />, name: 'Mute' },
];

const OwnerActions = [
  { icon: <StarRateIcon />, name: 'Admin' },
  { icon: <RemoveCircleIcon />, name: 'User Ban' },
  { icon: <VolumeOffIcon />, name: 'Mute' },
];

export default function BasicSpeedDial(props: { participantInfo: any }) {
  const userType = useRecoilValue(userAuth);
  return (
    //admin의 등급에 따라 아이콘 구분
    // [axios POST 요청] 모든 액션에 대하여 설정 적용요청
    // owner 모든 버튼 활성화 admin등록, 추방, 음소거
    // admin은 추방 및 음소거 (owner 제외)

    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{
        position: 'absolute',
        width: '48px',
        height: '48px',
      }}
      icon={<SettingsApplicationsIcon />}
      direction="right"
    >
      {userType === OWNER
        ? OwnerActions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))
        : AdminActions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
    </SpeedDial>
  );
}
