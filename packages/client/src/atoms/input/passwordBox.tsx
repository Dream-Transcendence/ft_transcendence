import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { HandlePassword } from '../../types/Room.type';

interface State {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}

function PasswordInput(props: { handlers: HandlePassword }) {
  const { handlePassword, handleChangePassword } = props.handlers;
  const [values, setValues] = React.useState<State>({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      //동기적으로 바꾸기 위해 event.value를 명시적으로 선언해줌
      //[수정완료]한글자씩 밀리는 현상발생
      const value = event.target.value;
      setValues({ ...values, [prop]: value });
      handlePassword(value);
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    //잠금설정에 따라 input을 보이게 또는 안보이게 설정할 것
    <FormControl
      sx={{ m: 0, width: '100%', marginTop: '4%' }}
      variant="standard"
    >
      <InputLabel
        htmlFor="standard-adornment-password"
        variant="filled"
        size="small"
        sx={{ mt: 1, width: '60%' }}
      >
        Password
      </InputLabel>
      {/* [axios POST 요청]해당 채팅방 비밀번호 확인 및 등록 */}
      <Input
        type={values.showPassword ? 'span' : 'password'}
        value={values.password}
        onChange={handleChange('password')}
        //보류
        onKeyPress={(event) => {
          if (handleChangePassword) {
            if (event.key === 'Enter') {
              handleChangePassword();
            }
          }
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {values.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

export default PasswordInput;
