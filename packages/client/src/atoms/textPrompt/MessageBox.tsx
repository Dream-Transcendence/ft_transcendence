import { ControlMessage, SocketMessage } from '../../types/Message.type';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ThemeProvider, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { userDataAtom } from '../../recoil/user.recoil';

const TextBoxLayout = styled('section')(() => ({
  height: '100%',
  width: '80%',
}));

const TextBox = styled('div')(() => ({
  height: '90%',
  width: '100%',
  padding: '3%',
  display: 'flex',
}));

const ListTextLayout = styled('div')(({ theme }) => ({
  height: '100%',
  width: '100%',
}));

const OtherTextInput = styled('section')(({ theme }) => ({
  overflow: 'auto',
  width: '60%',
  backgroundColor: '#003566',
  borderRadius: '0px 10px 10px 10px',
  justifyContent: 'center',
}));

const OwnTextInput = styled('section')(({ theme }) => ({
  width: '60%',
  backgroundColor: '#5154ff',
  marginRight: '-20%',
  borderRadius: '10px 0px 10px 10px',
  justifyContent: 'center',
  float: 'right',
}));

function MessageBox(prop: { message: SocketMessage }) {
  const msg = prop.message;
  const userData = useRecoilValue(userDataAtom);
  return (
    <TextBoxLayout>
      {msg.user.id === userData.id ? (
        <OwnTextInput>
          <Typography
            whiteSpace={'normal'}
            padding={'8%'}
            color={'white'}
            fontSize={12}
            style={{ wordWrap: 'break-word' }}
          >
            {msg.body}
          </Typography>
        </OwnTextInput>
      ) : (
        <TextBox>
          <ListItemAvatar>
            <Avatar alt={'messgae img'} src={msg.user.image}></Avatar>
          </ListItemAvatar>
          <ListTextLayout>
            <Typography color={'gray'} fontSize={7}>
              {msg.user.nickname}
            </Typography>
            <OtherTextInput>
              <Typography padding={'8%'} color={'white'} fontSize={12}>
                {msg.body}
              </Typography>
            </OtherTextInput>
          </ListTextLayout>
        </TextBox>
      )}
    </TextBoxLayout>
  );
}

export default MessageBox;
