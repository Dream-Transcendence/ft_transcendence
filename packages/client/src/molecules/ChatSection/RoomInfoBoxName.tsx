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
import { BLOCK } from '../../configs/Block.case';
import axios from 'axios';

const InfoBoxNameLayout = styled('div')(({ theme }) => ({
  width: '70%',
  height: '95%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginLeft: '2%',
}));

const UserStateLayout = styled('section')(({ theme }) => ({
  width: '4%',
  display: 'flex',
  alignContent: 'center',
  paddingRight: '8%',
}));

const BlockBadge = styled('span')(({ theme }) => ({
  marginLeft: '-0.25%',
  marginTop: '-0.2%',
  height: '40px',
  width: '40px',
  border: 'solid red',
  borderRadius: '100%',
  position: 'absolute',
  backgroundColor: '#f3333355',
  zIndex: '1',
}));

const BlockCloss = styled('span')(({ theme }) => ({
  marginTop: '48%',
  marginLeft: '0%',
  height: '3px',
  width: '40px',
  position: 'absolute',

  transform: 'rotate(-40deg)',
  backgroundColor: '#f33333',
  zIndex: '1',
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
  const [roomImage, setRoomImage] = useState<string>(image);
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

  const handleRoomImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      console.log(file);
      const fd = new FormData();
      setRoomImage(file.name);
      console.log('image', roomImage);
      roomInfo['image'] = roomImage;
      fd.append('image', file, roomImage);
      console.log(fd, '이미지 변경할할거유');
      //api부를 위치
    }
  };

  const handleChangeRoomName = () => {
    roomInfo['name'] = roomName;
    setChangeRoomName(true);
  };

  return (
    <InfoBoxNameLayout>
      {type === DM ? (
        <UserStateLayout>
          {roomInfo.blocked === BLOCK && (
            <BlockBadge>
              <BlockCloss />
            </BlockBadge>
          )}
          <Avatar alt="DMImg" src={roomImage} />
        </UserStateLayout>
      ) : (
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          {/* [수정사항] 이미지 수정기능 추가해야함 */}
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={handleRoomImage}
          />
          <Avatar alt="Remy Sharp" src={roomImage} />
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
