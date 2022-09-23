import styled from '@emotion/styled';
import { FormControlLabel, Switch } from '@mui/material';

const SecondAuthSwitchLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

function SecondAuthSwitch() {
  return (
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
      />
    </SecondAuthSwitchLayout>
  );
}

export default SecondAuthSwitch;
