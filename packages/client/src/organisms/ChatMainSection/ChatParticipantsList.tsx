import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';

function generate(element: React.ReactElement) {
  return [0, 1, 2, 3, 4].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const ChatParticipantsListLayout = styled('div')(({ theme }) => ({
  width: '98%',
  height: '90%',
  border: 'solid 1px',
}));

function ChatParticipantsListOrganisms() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  return (
    <ChatParticipantsListLayout>
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
        {/* {generate()} */}
      </List>
    </ChatParticipantsListLayout>
  );
}

export default ChatParticipantsListOrganisms;
