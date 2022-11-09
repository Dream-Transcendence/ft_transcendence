import { styled } from '@mui/material/styles';
import { FormControlLabel, Switch } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userDataAtom, userSecondAuth } from '../../../recoil/user.recoil';
import { UserSecondAuth } from '../../../types/Profile.type';

const SecondAuthSwitchLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '0.5rem',
}));

const AuthSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&:after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));

function SecondAuthSwitch() {
  const userData = useRecoilValue(userDataAtom);
  const navigate = useNavigate();
  const [passSecondOauth, setPassSecondOauth] =
    useRecoilState<UserSecondAuth>(userSecondAuth);

  const unSetSecondAuth = async () => {
    await axios
      .patch(
        `${process.env.REACT_APP_SERVER_URL}/users/${userData.id}/2nd-auth`,
      )
      .then(() => {
        setPassSecondOauth({
          checkIsSecondOauth: false,
          checkIsValid: true,
        });
        alert('2차 인증이 해제되었습니다.');
      });
  };

  const handleChangeAuth = () => {
    if (passSecondOauth.checkIsSecondOauth) {
      try {
        unSetSecondAuth(); // 클릭된 현재 Auth가 on일 때 // auth를 끄는 동작
      } catch (error) {
        // alert(error);
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
          <AuthSwitch
            inputProps={{ 'aria-label': 'controlled' }}
            checked={passSecondOauth.checkIsSecondOauth}
            onClick={handleChangeAuth}
          />
        }
        label="2차 인증"
      />
    </SecondAuthSwitchLayout>
  );
}

export default SecondAuthSwitch;
