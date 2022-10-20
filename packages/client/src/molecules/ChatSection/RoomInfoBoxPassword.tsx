import { styled } from '@mui/material/styles';
import CustomIconButton from '../../atoms/button/icon/CustomIconButtion';
import PasswordInput from '../../atoms/input/passwordBox';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { CustomIconProps } from '../../types/Link.type';
import { DM, PROTECTED } from '../../configs/RoomType';
import { useEffect, useState } from 'react';
import { RoomInfoSet } from '../../types/Room.type';
import { ChangeRoomInfo } from '../../organisms/ChatMainSection/EnteredChatRoomInfo';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { OWNER } from '../../configs/userType';
import { userAuth } from '../../recoil/chat.recoil';

const InfoBoxPasswordLayout = styled('div')(({ theme }) => ({
  width: '30%',
  display: 'flex',
}));

const InfoBoxPasswordInnerLayout = styled('section')(({ theme }) => ({
  display: 'flex',
  minHeight: '100px',
}));

const PasswordIconLayout = styled('div')(({ theme }) => ({
  paddingTop: '9%',
}));

function InfoBoxPasswordModule(props: { roomInfoSet: RoomInfoSet }) {
  const roomInfoSet = props.roomInfoSet;
  const { roomInfo, handler } = roomInfoSet;
  const { type } = roomInfo;
  const { roomId } = useParams();
  const [password, setPassword] = useState<string>('');
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const userType = useRecoilValue(userAuth);
  roomInfoSet['roomId'] = roomId;

  useEffect(() => {
    if (changePassword) {
      try {
        if (handler !== undefined) {
          const room = { ...roomInfo, salt: password };
          handler(room);
        }
        ChangeRoomInfo({ ...roomInfoSet, roomInfo: roomInfo });
      } catch (error) {
        alert(error);
        console.dir(error);
      }
    }
    return setChangePassword(false);
  }, [roomInfoSet, roomInfo, password, changePassword]);

  const handlePassword = (childData: string) => {
    setPassword(childData);
  };

  const handleChangePassword = () => {
    setChangePassword(true);
  };

  const lockIconProps: CustomIconProps = {
    icon: <LockIcon />,
    action: handleChangePassword,
  };
  const lockOpenIconProps: CustomIconProps = {
    icon: <LockOpenIcon />,
    action: handleChangePassword,
  };

  return (
    <InfoBoxPasswordLayout>
      {type !== DM && userType === OWNER && (
        <InfoBoxPasswordInnerLayout>
          <PasswordIconLayout>
            {type === PROTECTED ? (
              <CustomIconButton customProps={lockIconProps} />
            ) : (
              <CustomIconButton customProps={lockOpenIconProps} />
            )}
          </PasswordIconLayout>
          <PasswordInput handler={handlePassword} />
        </InfoBoxPasswordInnerLayout>
      )}
    </InfoBoxPasswordLayout>
  );
}

export default InfoBoxPasswordModule;
