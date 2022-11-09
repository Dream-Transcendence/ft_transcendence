import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import StarRateIcon from '@mui/icons-material/StarRate';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { useRecoilValue } from 'recoil';
import { OWNER, ADMIN, COMMON } from '../../configs/userType';
import { userAuth } from '../../recoil/chat.recoil';
import { chatNameSpace, PATCHUSERINFO } from '../../socket/event';
import { useParams } from 'react-router-dom';
import {
  ChangeParticipantInfo,
  ParticipantInfo,
  ParticipantInfoNState,
} from '../../types/Participant.type';
import useSocket from '../../socket/useSocket';
import { useEffect } from 'react';
import { BAN, MUTE, NONE } from '../../configs/Status.case';

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
  const { user, auth, status } = participantInfo;
  const userType = useRecoilValue(userAuth);
  const { roomId } = useParams();
  const [socket] = useSocket(chatNameSpace);
  const filteredParticipants: ParticipantInfo[] = participantInfoArray.filter(
    (participant) => participant.user.id !== participantInfo.user.id,
  );

  const setInfo = (authValue: number | null, statusValue: number | null) => {
    return {
      userId: user.id,
      roomId: Number(roomId),
      auth: authValue,
      status: statusValue,
    };
  };

  const onOffCrown = () => {
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
  };

  //[검증사항]mute는 로그인 구현 후, 검증가능
  const OnMute = () => {
    if (status !== BAN && status !== MUTE) {
      setParticipantInfos([
        ...filteredParticipants,
        changeParticipant(participantInfo, 'status', MUTE),
      ]);
    }
  };

  const beNone = () => {
    setParticipantInfos([
      ...filteredParticipants,
      changeParticipant(participantInfo, 'status', null),
    ]);
  };

  const handleAdmin = () => {
    let info: ChangeParticipantInfo;
    if (status !== MUTE && status !== BAN) {
      if (auth === ADMIN) {
        info = setInfo(COMMON, status);
      } else {
        info = setInfo(ADMIN, status);
      }
      setUserState(info, onOffCrown);
    } else {
      alert('해당 유저의 제약을 해제한 뒤, 설정해주세요');
    }
  };

  const handleBan = () => {
    //영구
    if (status !== MUTE) {
      if (status === BAN) {
        const info = setInfo(auth, NONE);
        setUserState(info, beNone);
      } else if (status !== BAN) {
        const info = setInfo(auth, BAN);
        setUserState(info, KickOff);
      }
    } else if (status === MUTE) {
      alert('유저의 음소거 상태가 해제되면 다시 시도해주세요');
    }
  };

  const handleMute = () => {
    if (userType === ADMIN && auth === ADMIN) {
      alert('같은 관리자는 음소거를 할 수 없습니다.');
      return;
    }
    if (status !== BAN) {
      if (status !== MUTE) {
        const info = setInfo(auth, MUTE);
        setUserState(info, OnMute);
      } else if (status === MUTE) {
        const info = setInfo(auth, NONE);
        setUserState(info, beNone);
      }
    } else if (status === BAN) {
      alert('유저의 제약상태를 해제 후, 다시 시도해주세요');
    }
  };

  const setUserState = (info: ChangeParticipantInfo, action: () => void) => {
    socket.emit(`${PATCHUSERINFO}`, info);
    action();
  };

  useEffect(() => {
    socket.on('exception', (response: any) => {
      alert(`변경불가 \n 사유: ${response.message}`);
    });
    return () => {
      socket.off('exception');
    };
  }, [socket]);

  const AdminActions = [
    { icon: <RemoveCircleIcon />, name: 'User Ban', action: handleBan },
    { icon: <VolumeOffIcon />, name: 'Mute', action: handleMute },
  ];

  const OwnerActions = [
    { icon: <RemoveCircleIcon />, name: 'User Ban / kick', action: handleBan },
    { icon: <VolumeOffIcon />, name: 'Mute', action: handleMute },
    { icon: <StarRateIcon />, name: 'Admin', action: handleAdmin },
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
        marginLeft: '-10%',
        width: '48px',
        height: '48px',
      }}
      icon={<SettingsApplicationsIcon />}
      direction="left"
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
