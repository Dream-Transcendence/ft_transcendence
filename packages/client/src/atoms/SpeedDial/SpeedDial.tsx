import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import StarRateIcon from '@mui/icons-material/StarRate';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { useRecoilValue } from 'recoil';
import { OWNER, ADMIN, COMMON } from '../../configs/userType';
import { userAuth } from '../../recoil/chat.recoil';
import { chatNameSpace, patchUserInfo } from '../../socket/event';
import { useParams } from 'react-router-dom';
import {
  ChangeParticipantInfo,
  ParticipantInfo,
  ParticipantInfoNState,
} from '../../types/Participant.type';
import useSocket from '../../socket/useSocket';
import { useState } from 'react';
import { BAN, MUTE, NONE } from '../../configs/Status.case';
import { userDataAtom } from '../../recoil/user.recoil';

//와.. 뭐지 react-dom.development.js:16317 Uncaught Error: Too many re-renders. React limits the number of renders to prevent an infinite loop 에러 발생
//아래의 코드가 문제인듯하다.
// const checkStatus = (
//   auth: number | null,
//   status: number | null,
//   AdminSetter: (state: boolean) => void,
//   MuteSetter: (state: boolean) => void,
// ) => {
//   if (status === MUTE) MuteSetter(true);
//   else if (status === BAN) console.log('ban!!!!!!');
//   else if (auth === ADMIN) AdminSetter(true);
// };

const changeParticipant = (
  participantInfo: ParticipantInfo,
  key: string,
  value: number | null,
) => {
  return { ...participantInfo, [key]: value };
};

function BasicSpeedDial(props: {
  participantInfoNState: ParticipantInfoNState;
}) {
  const {
    participantInfo,
    handler: setParticipantInfos,
    participantInfoArray,
  } = props.participantInfoNState;
  const { user, auth, status, blocked } = participantInfo;
  const userType = useRecoilValue(userAuth);
  const userData = useRecoilValue(userDataAtom);
  const { roomId } = useParams();
  const [socket] = useSocket(chatNameSpace);
  const filteredParticipants: ParticipantInfo[] = participantInfoArray.filter(
    (participant) => participant.user.id !== participantInfo.user.id,
  );

  const [isAdmin, setIsAdmin] = useState(false);
  //const isBan = useState();
  const [isMute, setIsMute] = useState(false);

  const setInfo = (authValue: number | null, statusValue: number | null) => {
    return {
      userId: user.id,
      roomId: Number(roomId),
      auth: authValue,
      status: statusValue,
    };
  };

  const onOffCrown = () => {
    console.log('Admin!!!!!!!!!');
    if (participantInfo.auth === ADMIN)
      setParticipantInfos([
        ...filteredParticipants,
        changeParticipant(participantInfo, 'auth', COMMON),
      ]);
    else if (participantInfo.auth === COMMON)
      setParticipantInfos([
        ...filteredParticipants,
        changeParticipant(participantInfo, 'auth', ADMIN),
      ]);
  };

  //[검증사항]ban은 로그인 구현 후, 검증가능
  const KickOff = () => {
    setParticipantInfos([
      ...filteredParticipants,
      changeParticipant(participantInfo, 'status', BAN),
    ]);
    console.log('ban!!!!!!!!!!!');
  };

  //[검증사항]mute는 로그인 구현 후, 검증가능
  const OnMute = () => {
    // if (!isMute) setIsMute(true);
    // else alert('이미 음소거 처리되었습니다.');
    setParticipantInfos([
      ...filteredParticipants,
      changeParticipant(participantInfo, 'status', MUTE),
    ]);
    console.log('mute!!!!!!!!!!!');
  };

  const OnUnMute = () => {
    // if (!isMute) setIsMute(true);
    // else alert('이미 음소거 처리되었습니다.');
    setParticipantInfos([
      ...filteredParticipants,
      changeParticipant(participantInfo, 'status', 8),
    ]);
    console.log('unmute!!!!!!!!!!!');
  };

  const handleAdmin = () => {
    let info: ChangeParticipantInfo;
    if (auth === ADMIN) {
      info = setInfo(COMMON, status);
    } else {
      info = setInfo(ADMIN, status);
    }
    setUserState(info, onOffCrown);
  };

  const handleBan = () => {
    if (status !== BAN) {
      const info = setInfo(auth, BAN);
      setUserState(info, KickOff);
      setTimeout(async () => {
        const info = await setInfo(auth, NONE);
        setUserState(info, OnUnMute);
      }, 5000);
    }
  };

  const handleMute = () => {
    if (auth === ADMIN) {
      alert('관리자 권한을 해제한 뒤, 음소거 가능합니다.');
      return;
    }
    if (status !== MUTE && status !== BAN) {
      const info = setInfo(auth, MUTE);
      setUserState(info, OnMute);
      setTimeout(async () => {
        const info = await setInfo(auth, NONE);
        setUserState(info, OnUnMute);
      }, 5000);
    }
    // set비동기처리 30초
    //interval로 남은시간처리..?
  };

  const setUserState = (info: ChangeParticipantInfo, action: () => void) => {
    socket.emit(`${patchUserInfo}`, info, (response: any) => {
      // action();
    });
    socket.on('exception', (response: any) => {
      alert(`변경불가 \n 사유: ${response.message}`);
    });
    action();
  };

  const AdminActions = [
    { icon: <RemoveCircleIcon />, name: 'User Ban', action: handleBan },
    { icon: <VolumeOffIcon />, name: 'Mute', action: handleMute },
  ];

  const OwnerActions = [
    { icon: <StarRateIcon />, name: 'Admin', action: handleAdmin },
    { icon: <RemoveCircleIcon />, name: 'User Ban', action: handleBan },
    { icon: <VolumeOffIcon />, name: 'Mute', action: handleMute },
  ];

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
              onClick={action.action}
            />
          ))
        : AdminActions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.action}
            />
          ))}
    </SpeedDial>
  );
}

export default BasicSpeedDial;
