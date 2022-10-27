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
import ChatRoomImageProfile from '../../atoms/profile/ChatRoomImageProfile';
import { ADMIN, OWNER } from '../../configs/userType';

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
  const { name, type, image, auth } = roomInfo;
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

  const handleChangeRoomName = () => {
    roomInfo['name'] = roomName;
    setChangeRoomName(true);
  };

  console.log('auth', auth);
  return (
    <InfoBoxNameLayout>
      {type === DM ? (
        <UserStateLayout>
          {roomInfo.blocked === BLOCK && (
            <BlockBadge>
              <BlockCloss />
            </BlockBadge>
          )}
          <Avatar alt="DMImg" src={roomInfo.image} />
        </UserStateLayout>
      ) : auth === OWNER ? (
        <ChatRoomImageProfile roomInfoSet={roomInfoSet} />
      ) : (
        <Avatar
          style={{ marginRight: '3%' }}
          alt="Remy Sharp"
          src={roomImage}
        />
      )}
      {/* [axios GET 요청]해당 채팅방 제목, 이미지 요청 */}
      <FormControl>
        {type === DM ? (
          <Typography paddingLeft={'10px'} color={'white'}>
            {name}
          </Typography>
        ) : auth === OWNER ? (
          <Input
            disableUnderline
            style={divStyle}
            placeholder={name}
            onChange={handleRoomName()}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleChangeRoomName();
              }
            }}
          ></Input>
        ) : (
          <Typography paddingLeft={'10px'} color={'white'}>
            {name}
          </Typography>
        )}
      </FormControl>
    </InfoBoxNameLayout>
  );
}

export default InfoBoxNameModule;
