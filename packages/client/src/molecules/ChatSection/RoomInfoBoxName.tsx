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
function InfoBoxNameModule(props: { roomInfo: any }) {
  const { name, type, image } = props.roomInfo;
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
        <Typography color={'white'}>{name}</Typography>
      </FormControl>
    </InfoBoxNameLayout>
  );
}

export default InfoBoxNameModule;
