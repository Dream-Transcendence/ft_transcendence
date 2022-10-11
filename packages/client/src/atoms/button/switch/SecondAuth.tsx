import styled from '@emotion/styled';
import { FormControlLabel, Switch } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { SERVERURL } from '../../../configs/Link.url';
import { UserSecondAuth } from '../../../types/Profile.type';

const SecondAuthSwitchLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '0.5rem',
}));

function SecondAuthSwitch() {
  const { userId } = useParams();
  const [isAuth, setIsAuth] = useState<UserSecondAuth>({
    authenticated: false,
  })

  useEffect(() => {
    async function getSecondAuth() {
      try {
        const response = await axios.get(
          `${SERVERURL}/users/${userId}/2nd-auth`,
        );
        setIsAuth(response.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
    getSecondAuth();
  }, [userId]);

  const togleAuth = () => {
    async function changeAuth() {
      try {
        const response = await axios.post(`${SERVERURL}/users/${userId}/2nd-auth`);
        if (response.status === 200) {
          setIsAuth((preAuth) => {
            let newAuth = {...preAuth};
            newAuth.authenticated = !preAuth.authenticated;
            return newAuth;
          });
        }
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
    changeAuth();
  }

  return (
    //[axios GET 요청] 2차 인증 여부
    <SecondAuthSwitchLayout>
      <FormControlLabel
        control={
          <Switch
            //onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
            color="default"
            checked={isAuth.authenticated}
            onClick={togleAuth}
          />
        }
        label="2차 인증"
      // [axios PATCH 요청] 2차 인증 상태 변경
      />
    </SecondAuthSwitchLayout>
  );
}

export default SecondAuthSwitch;
