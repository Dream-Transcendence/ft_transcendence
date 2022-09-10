import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';

function generate(element: React.ReactElement) {
  return [0, 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

function ChatRoomListOrganisms() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return (
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
  );
}

export default ChatRoomListOrganisms;
