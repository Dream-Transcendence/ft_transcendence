import styled from '@emotion/styled';
import { FormControlLabel, Switch } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { SERVERURL } from '../../../configs/Link.url';
import { userDataAtom, userSecondAuth } from '../../../recoil/user.recoil';
import {
  UserSecondAuth,
  UserSecondAuthBody,
} from '../../../types/Profile.type';

const SecondAuthSwitchLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '0.5rem',
}));

function SecondAuthSwitch() {
  const userData = useRecoilValue(userDataAtom);
  const navigate = useNavigate();
  const [passSecondOauth, setPassSecondOauth] =
    useRecoilState<UserSecondAuth>(userSecondAuth);

  const unSetSecondAuth = async () => {
    await axios.patch(`${SERVERURL}/users/${userData.id}/2nd-auth`).then(() => {
      setPassSecondOauth({
        checkIsSecondOauth: false,
        checkIsValid: true,
      });
      alert('2차 인증이 해제되었습니다.');
    });
  };

  const handleChangeAuth = () => {
    console.log('IsSecondOauth:', passSecondOauth);
    if (passSecondOauth.checkIsSecondOauth) {
      try {
        unSetSecondAuth(); // 클릭된 현재 Auth가 on일 때 // auth를 끄는 동작
      } catch (error) {
        console.dir(error);
      }
    } else if (!passSecondOauth.checkIsSecondOauth) {
      navigate('/secondOauth'); // 클릭된 현재 Auth가 off일 때 // auth를 키는 동작
    }
  };

  return (
    //[axios GET 요청] 2차 인증 여부
    <SecondAuthSwitchLayout>
      <FormControlLabel
        control={
          <Switch
            //onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
            color="default"
            checked={passSecondOauth.checkIsSecondOauth}
            onClick={handleChangeAuth}
          />
        }
        label="2차 인증"
        // [axios PATCH 요청] 2차 인증 상태 변경
      />
    </SecondAuthSwitchLayout>
  );
}

export default SecondAuthSwitch;
