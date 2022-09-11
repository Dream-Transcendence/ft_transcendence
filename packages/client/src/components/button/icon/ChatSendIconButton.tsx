import { IconButton, styled } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function ChatSendIconButton() {
  return (
    <IconButton aria-label="game" size="large">
      <SendIcon />
    </IconButton>
  );
}

export default ChatSendIconButton;
