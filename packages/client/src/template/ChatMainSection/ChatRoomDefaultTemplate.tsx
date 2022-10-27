import * as React from 'react';
import { styled } from '@mui/material/styles';
import SmsIcon from '@mui/icons-material/Sms';
import { color } from '@mui/system';
import { Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { userDataAtom, userSecondAuth } from '../../recoil/user.recoil';
import { useNavigate } from 'react-router-dom';
import { UserSecondAuth } from '../../types/Profile.type';
import { useEffect } from 'react';

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
  const userData = useRecoilValue(userDataAtom);
  const navigate = useNavigate();
  const passSecondOauth = useRecoilValue<UserSecondAuth>(userSecondAuth);

  useEffect(() => {
    //정상적인 접근인지 판단하는 로직
    if (userData.id === 0 || passSecondOauth.checkIsValid === false)
      navigate('/');
  }, [userData.id, passSecondOauth, navigate]);

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
