import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ThemeProvider, Typography } from '@mui/material';

const ListTextLayout = styled('div')(({ theme }) => ({
  height: '100%',
}));

//함수에 프롭을 넣던지 테마를 적용해서 색을 바꿔줘야함.
const ListTextBox = styled('div')(({ theme }) => ({
  overflow: 'auto',
  height: '100%',
  backgroundColor: '#003566',
  borderRadius: '0px 7px 7px 7px',
  display: 'flex',
  justifyContent: 'center',
}));

const TextInput = styled('div')(({ theme }) => ({
  width: '95%',
  height: '100%',
}));

//텍스트 박스가 특정 글자 이상 넘어갔을 때 wrap되도록 설정해야함
function ChatProfileNText() {
  return (
    <ListItem
      sx={{
        width: '93%',
        margin: '10px',
      }}
    >
      <ListItemAvatar>
        <Avatar>
          <AccountCircleIcon />
        </Avatar>
      </ListItemAvatar>
      <></>
      <ListTextLayout>
        <Typography fontSize={7}>Junghan</Typography>
        <ListTextBox>
          <TextInput>
            <Typography fontSize={12}>안녕하세요??????????????????</Typography>
          </TextInput>
        </ListTextBox>
      </ListTextLayout>
    </ListItem>
  );
}

export default ChatProfileNText;
