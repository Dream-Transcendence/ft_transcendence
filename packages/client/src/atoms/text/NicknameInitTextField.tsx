import styled from '@emotion/styled';
import { TextField } from '@mui/material';

const NickNameTextFieldLayout = styled('text')(({ theme }) => ({
  alignSelf: 'center',
  backgroundColor: '#00ff0000',
  width: '100%',
  height: '60%',
}));

function NickNameTextField() {
  return (
    <NickNameTextFieldLayout>
      <TextField
        id="nickName"
        label="닉네임을 입력하세요."
        variant="filled"
        fullWidth
      />
    </NickNameTextFieldLayout>
  );
}

export default NickNameTextField;
