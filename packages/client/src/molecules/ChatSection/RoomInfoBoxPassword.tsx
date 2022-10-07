import { styled } from '@mui/material/styles';
import CustomIconButton from '../../atoms/button/icon/CustomIconButtion';
import {
  Avatar,
  Typography,
  IconButton,
  Button,
  TextField,
  Input,
  InputLabel,
  FormControl,
} from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import PasswordInput from '../../atoms/input/passwordBox';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { CustomIconProps } from '../../types/Link.type';
import { PROTECTED } from '../../configs/RoomType';
import axios from 'axios';
import { SERVERURL } from '../../configs/Link.url';
import { useEffect, useState } from 'react';
import { RoomInfoSet } from '../../types/Room.type';
import { ChangeRoomInfo } from '../../organisms/ChatMainSection/EnteredChatRoomInfo';
import { useParams } from 'react-router-dom';

const InfoBoxPasswordLayout = styled('div')(({ theme }) => ({
  width: '30%',
  display: 'flex',
}));

function InfoBoxPasswordModule(props: { roomInfoSet: RoomInfoSet }) {
  const roomInfoSet = props.roomInfoSet;
  const { roomInfo, handler } = roomInfoSet;
  const { name, type, image } = roomInfo;
  const { roomId } = useParams();
  const [password, setPassword] = useState('');
  const [changePassword, setChangePassword] = useState<boolean>(false);
  roomInfoSet['roomId'] = roomId;

  useEffect(() => {
    if (changePassword) {
      try {
        roomInfo['salt'] = password;
        ChangeRoomInfo(roomInfoSet);
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
  // console.log('in pass box', type);
  // console.log('password', password);

  return (
    <InfoBoxPasswordLayout>
      {type === PROTECTED ? (
        <CustomIconButton customProps={lockIconProps} />
      ) : (
        <CustomIconButton customProps={lockOpenIconProps} />
      )}
      <PasswordInput handler={handlePassword} />
    </InfoBoxPasswordLayout>
  );
}

export default InfoBoxPasswordModule;
