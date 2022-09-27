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
      {/* FileUploadButton 만들었습니다. 가져다 사용하셔도 좋아요 */}
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" />
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </IconButton>
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
