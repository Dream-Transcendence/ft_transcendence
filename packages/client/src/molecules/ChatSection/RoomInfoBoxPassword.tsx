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
import { useState } from 'react';

const InfoBoxPasswordLayout = styled('div')(({ theme }) => ({
  width: '30%',
  display: 'flex',
  flexDirection: 'row',
}));

function InfoBoxPasswordModule(props: { roomInfo: any }) {
  console.log(props.roomInfo);
  const { id: roomId, type } = props.roomInfo;
  const [password, setPassword] = useState('');

  // async function changePassword() {
  //   try {
  //     //[수정사항] 임시로 userid를 1로 지정. doyun님과 소통 후, 변경 예정
  //     const response = await axios.patch(
  //       `${SERVERURL}/rooms/${roomId}`,
  //       {
  //         salt: password,
  //       },
  //     );
  //     navigate(`${CHATROOMURL}${roomId}`);
  //   } catch (error) {
  //     alert(error);
  //     throw console.dir(error);
  //   }
  // }

  const handlePassword = (childData: string) => {
    setPassword(childData);
  };

  const lockIconProps: CustomIconProps = {
    icon: <LockIcon />,
    // action:
  };
  const lockOpenIconProps: CustomIconProps = {
    icon: <LockOpenIcon />,
    // action:
  };
  console.log(type);

  return (
    <InfoBoxPasswordLayout>
      {type === PROTECTED ? (
        <div>
          <PasswordInput handler={handlePassword} />
          <CustomIconButton customProps={lockIconProps} />
        </div>
      ) : (
        <CustomIconButton customProps={lockOpenIconProps} />
      )}
      {/* {CustomIconButton(<LockOpenIcon />)} 상황에 따라 아이콘 바꿀 것 */}
    </InfoBoxPasswordLayout>
  );
}

export default InfoBoxPasswordModule;
