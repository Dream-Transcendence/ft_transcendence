import styled from '@emotion/styled';
import { FormControlLabel, Switch } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { SERVERURL } from '../../../configs/Link.url';
import { reqUserDataAtom } from '../../../pages/PingpongRoutePage';
import { UserSecondAuth } from '../../../types/Profile.type';

const SecondAuthSwitchLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '0.5rem',
}));

export const userAuth = atom<UserSecondAuth>({
  key: 'userAuth',
  default: {
    authenticated: false,
  },
});

function SecondAuthSwitch() {
  const reqUser = useRecoilValue(reqUserDataAtom);
  const [isAuth, setIsAuth] = useRecoilState<UserSecondAuth>(userAuth);
  useEffect(() => {
    async function getSecondAuth() {
      const response = await axios.get(
        `${SERVERURL}/users/${reqUser.id}/2nd-auth`,
      );
      console.log('SecondAuthSwitch : ', response.data);
      setIsAuth(response.data);
    }
    try {
      getSecondAuth();
    } catch {
      console.log('error : SecondAuthSwitch');
    }
  });
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
          />
        }
        label="2차 인증"
      // [axios PATCH 요청] 2차 인증 상태 변경
      />
    </SecondAuthSwitchLayout>
  );
}

export default SecondAuthSwitch;
