import * as React from 'react';
import { styled } from '@mui/material/styles';
import SmsIcon from '@mui/icons-material/Sms';
import { color } from '@mui/system';
import { Typography } from '@mui/material';
//임시방편으로 만들어 놓음 디자인은 나중에 수정할 것
const ChattingRoomDefaultLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

function ChatRoomDefaultTemplate() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return <ChattingRoomDefaultLayout></ChattingRoomDefaultLayout>;
}

export default ChatRoomDefaultTemplate;
