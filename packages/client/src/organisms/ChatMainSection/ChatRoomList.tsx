import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ChatRoomElementOrganisms from './ChatRoomElement';

function generate(element: React.ReactElement) {
  return [0, 1, 2, 3, 4, 5, 6].map((value) =>
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
        width: '98%',
        height: '98%',
        marginLeft: '1%',
        bgcolor: '#00000000',
        position: 'relative',
        overflow: 'auto',
        '& ul': { padding: 1 },
      }}
    >
      {generate(<ChatRoomElementOrganisms />)}
    </List>
  );
}

export default ChatRoomListOrganisms;
