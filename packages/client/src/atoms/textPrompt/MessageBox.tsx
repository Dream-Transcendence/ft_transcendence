import { SocketMessage } from '../../types/Message.type';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { userDataAtom } from '../../recoil/user.recoil';

const TextBoxLayout = styled('section')(() => ({
  width: '100%',
  paddingTop: '3%',
  paddingBottom: '3%',
}));

const TextBox = styled('div')(() => ({
  height: '100%',
  width: '100%',
  padding: '1%',
  display: 'flex',
}));

const ListTextLayout = styled('div')(({ theme }) => ({
  height: '100%',
  width: '100%',
}));

const OtherTextInput = styled('section')(({ theme }) => ({
  width: '40%',
  backgroundColor: '#19226699',
  borderRadius: '0px 10px 10px 10px',
  justifyContent: 'center',
  float: 'left',
}));

const OwnTextInput = styled('section')(({ theme }) => ({
  width: '40%',
  backgroundColor: '#76aef199',
  marginRight: '-40%',
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
              <Typography
                whiteSpace={'normal'}
                padding={'8%'}
                color={'white'}
                fontSize={12}
                style={{ wordWrap: 'break-word' }}
              >
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
