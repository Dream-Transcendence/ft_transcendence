import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ChatProfileNText from '../../components/textPrompt/ChatProfileNText';

//이런식으로 엘리멘트를 함수로 전달가능하네 아이콘도 함수하나로 처리가능할듯
function generate(element: React.ReactElement) {
  return [0, 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const ChatLogLayout = styled('div')(({ theme }) => ({
  width: '90%',
  height: '92%',
  display: 'flex',
  flexDirection: 'column-reverse',
}));

function ChatLogListOranisms() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return (
    <ChatLogLayout>
      <List
        dense={dense}
        sx={{
          width: '100%',
          height: '100%',
          bgcolor: '#00000000',
          position: 'relative',
          overflow: 'auto',
          '& ul': { padding: 1 },
        }}
      >
        {generate(<ChatProfileNText />)}
      </List>
    </ChatLogLayout>
  );
}

export default ChatLogListOranisms;
