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
import { DM } from '../../configs/RoomType';
import { RoomInfoSet } from '../../types/Room.type';
import { useEffect, useState } from 'react';
import { ChangeRoomInfo } from '../../organisms/ChatMainSection/EnteredChatRoomInfo';
import { useParams } from 'react-router-dom';

const InfoBoxNameLayout = styled('div')(({ theme }) => ({
  width: '70%',
  height: '95%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginLeft: '2%',
}));

const divStyle = {
  color: 'white',
};

//[수정사항] any => ChannelDto
function InfoBoxNameModule(props: { roomInfoSet: RoomInfoSet }) {
  const roomInfoSet = props.roomInfoSet;
  const { roomInfo, handler } = roomInfoSet;
  const { roomId } = useParams();
  const { name, type, image } = roomInfo;
  const [roomName, setRoomName] = useState<string>(name);
  const [changeRoomName, setChangeRoomName] = useState<boolean>(false);
  roomInfoSet['roomId'] = roomId;

  useEffect(() => {
    if (changeRoomName) {
      try {
        ChangeRoomInfo({ ...roomInfoSet, roomInfo: roomInfo });
      } catch (error) {
        alert(error);
        console.dir(error);
      }
    }
    return setChangeRoomName(false);
  }, [roomInfoSet, roomInfo, changeRoomName]);

  const handleRoomName = () => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setRoomName(value);
  };

  const handleChangeRoomName = () => {
    roomInfo['name'] = roomName;
    setChangeRoomName(true);
  };

  console.log('??', roomName);
  return (
    <InfoBoxNameLayout>
      {type === DM ? (
        <Avatar alt="DMImg" src={image} />
      ) : (
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          {/* [수정사항] 이미지 수정기능 추가해야함 */}
          <input hidden accept="image/*" type="file" />
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </IconButton>
      )}
      {/* [axios GET 요청]해당 채팅방 제목, 이미지 요청 */}
      <FormControl>
        {type === DM ? (
          <Typography paddingLeft={'10px'} color={'white'}>
            {name}
          </Typography>
        ) : (
          <Input
            disableUnderline
            style={divStyle}
            value={roomName}
            placeholder={name}
            //계속 onchange가 안되고, value가 고정값이라 뭐가 문제인가 했더니
            //handleChange를 함수형태 던지니 제대로 작동이 안됐음.
            //()를 붙혀 실행시켜야함
            onChange={handleRoomName()}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleChangeRoomName();
              }
            }}
          ></Input>
        )}
      </FormControl>
    </InfoBoxNameLayout>
  );
}

export default InfoBoxNameModule;
