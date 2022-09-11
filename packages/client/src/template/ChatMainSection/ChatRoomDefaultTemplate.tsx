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
const DefaultDesignLayout = styled('div')(({ theme }) => ({
  width: '60%',
  height: '50%',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const TypoLayout = styled('div')(({ theme }) => ({
  width: '30%',
  height: '70%',
  display: 'flex',
}));
function ChatRoomDefaultTemplate() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return (
    <ChattingRoomDefaultLayout>
      <DefaultDesignLayout>
        <Typography
          sx={{
            width: '100%',
            height: '100%',
            fontSize: '1.0rem',
            left: '20%',
            '@media (min-width:1300px)': {
              fontSize: '2.5rem',
              left: '10%',
            },
            position: 'absolute',
            bottom: '10%',
          }}
        >
          친구와 대화를 시작해보세요
        </Typography>
        <SmsIcon
          sx={{
            width: '100%',
            height: '100%',
            color: '#4028BB',
            position: 'absolute',
          }}
        />
        <TypoLayout>
          <Typography
            sx={{
              width: '100%',
              height: '100%',
              fontSize: '18vh',
              top: '25%',
              '@media (min-width:1000px)': {
                fontSize: '20vh',
                top: '6%',
              },
              fontSizeAdjust: 'from-font',
              position: 'absolute',
            }}
          >
            👫
          </Typography>
        </TypoLayout>
      </DefaultDesignLayout>
    </ChattingRoomDefaultLayout>
  );
}

export default ChatRoomDefaultTemplate;
