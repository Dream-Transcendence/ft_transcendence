import { IconButton, styled } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

// const ChatIcon = styled.button`
//     flex-grow: 1;
// `;\

function ChatIconButton() {
  return (
    <IconButton aria-label="game" size="large">
      <ChatIcon fontSize="inherit" />
    </IconButton>
  );
}

export default ChatIconButton;
