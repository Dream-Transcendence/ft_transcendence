import { styled } from '@mui/material/styles';
import { Avatar, Typography, Input, FormControl } from '@mui/material';
import { DM } from '../../configs/RoomType';
import { RoomInfoSet } from '../../types/Room.type';
import { useEffect, useState } from 'react';
import { ChangeRoomInfo } from '../../organisms/ChatMainSection/EnteredChatRoomInfo';
import { useParams } from 'react-router-dom';
import { BLOCK } from '../../configs/Block.case';
import ChatRoomImageProfile from '../../atoms/profile/ChatRoomImageProfile';
import { OWNER } from '../../configs/userType';

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

function InfoBoxNameModule(props: { roomInfoSet: RoomInfoSet }) {
  const roomInfoSet = props.roomInfoSet;
  const { roomInfo } = roomInfoSet;
  const { roomId } = useParams();
  const { name, type, auth } = roomInfo;
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
    alert('방 이름이 변경되었습니다');
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
          <Avatar alt="DMImg" src={roomInfo.image} />
        </UserStateLayout>
      ) : auth === OWNER ? (
        <ChatRoomImageProfile roomInfoSet={roomInfoSet} />
      ) : (
        <Avatar
          style={{ marginRight: '3%' }}
          alt="Remy Sharp"
          src={roomInfo.image}
        />
      )}
      {/* [axios GET 요청]해당 채팅방 제목, 이미지 요청 */}
      <FormControl>
        {type === DM ? (
          <Typography paddingLeft={'10px'} color={'white'} spellCheck="false">
            {name}
          </Typography>
        ) : auth === OWNER ? (
          <Input
            disableUnderline
            style={divStyle}
            placeholder={name}
            spellCheck="false"
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
