import { IconButton, styled } from '@mui/material';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

// const ChatIcon = styled.button`
//     flex-grow: 1;
// `;\

function RoomOutIconButton() {
  return (
    <IconButton aria-label="game" size="large">
      <MeetingRoomIcon />
    </IconButton>
  );
}

export default RoomOutIconButton;
