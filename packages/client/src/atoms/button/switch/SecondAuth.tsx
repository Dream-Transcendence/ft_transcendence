import styled from '@emotion/styled';
import { FormControlLabel, Switch } from '@mui/material';

const SecondAuthSwitchLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '0.5rem',
}));

function SecondAuthSwitch() {
  return (
    //[axios GET 요청] 2차 인증 여부
    <SecondAuthSwitchLayout>
      <FormControlLabel
        control={
          <Switch
            //onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
            color="default"
          />
        }
        label="2차 인증"
        // [axios PATCH 요청] 2차 인증 상태 변경
      />
    </SecondAuthSwitchLayout>
  );
}

export default SecondAuthSwitch;
