import { styled } from '@mui/material/styles';
import CustomIconButton from '../../components/button/icon/CustomIconButtion';
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
import PasswordInput from '../../components/input/passwordBox';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const InfoBoxPasswordLayout = styled('div')(({ theme }) => ({
  width: '30%',
  display: 'flex',
  flexDirection: 'row',
}));

function InfoBoxPasswordModule() {
  return (
    <InfoBoxPasswordLayout>
      <PasswordInput />
      {CustomIconButton(<LockIcon />)}
      {/* {CustomIconButton(<LockOpenIcon />)} 상황에 따라 아이콘 바꿀 것 */}
    </InfoBoxPasswordLayout>
  );
}

export default InfoBoxPasswordModule;
