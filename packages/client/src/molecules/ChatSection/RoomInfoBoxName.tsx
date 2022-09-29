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

const InfoBoxNameLayout = styled('div')(({ theme }) => ({
  width: '50%',
  height: '95%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginLeft: '2%',
}));

const divStyle = {
  color: 'white',
};

function InfoBoxNameModule() {
  return (
    <InfoBoxNameLayout>
      {/* [axios GET 요청]해당 채팅방 제목, 이미지 요청 */}
      {/* [axios POST 요청]해당 채팅방 이미지 변경 */}
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" />
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </IconButton>
      {/* [axios POST 요청]해당 채팅방 정보 변경 */}
      <FormControl>
        <Input
          disableUnderline
          style={divStyle}
          placeholder="Trans외 5명"
        ></Input>
      </FormControl>
    </InfoBoxNameLayout>
  );
}

export default InfoBoxNameModule;
