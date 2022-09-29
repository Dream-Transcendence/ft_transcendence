import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { IconButton } from '@mui/material';

function LogoutIconButton() {
  //[axios GET 요청] LOGOUT
  return (
    <IconButton aria-label="game" size="large">
      <LogoutRoundedIcon fontSize="inherit" />
    </IconButton>
  );
}

export default LogoutIconButton;
