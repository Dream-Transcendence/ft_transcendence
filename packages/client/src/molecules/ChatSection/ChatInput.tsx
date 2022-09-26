import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import CustomIconButton from '../../atoms/button/icon/CustomIconButtion';
import SendIcon from '@mui/icons-material/Send';

function ChatInputModule() {
  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '98%',
        backgroundColor: '#00000000',
      }}
    >
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          backgroundColor: '#003566',
          borderRadius: '10px',
        }}
        placeholder="  내용을 입력하세요.."
        inputProps={{ 'aria-label': '내용을 입력하세요..' }}
      />
      {CustomIconButton(<SendIcon />)}
    </Paper>
  );
}

export default ChatInputModule;
