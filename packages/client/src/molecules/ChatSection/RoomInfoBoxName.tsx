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

function InfoBoxNameModule() {
  return (
    <InfoBoxNameLayout>
      {/* [axios GET 요청]해당 채팅방 제목, 이미지 요청 */}
      <IconButton color="primary" aria-label="upload picture" component="label">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </IconButton>
      <FormControl>
        <Typography color={'white'}>junghan</Typography>
      </FormControl>
    </InfoBoxNameLayout>
  );
}

export default InfoBoxNameModule;
