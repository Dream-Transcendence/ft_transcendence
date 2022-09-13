import styled from '@emotion/styled';
import { TextField } from '@mui/material';

const NickNameTextFiledLayout = styled('text')(({ theme }) => ({
  alignSelf: 'center',
  backgroundColor: '#00ff0000',
  width: '100%',
  height: '60%',
}));

function NickNameTextFiled() {
  return (
    <NickNameTextFiledLayout>
      <TextField
        id="nickName"
        label="닉네임을 입력하세요."
        variant="filled"
        fullWidth
      />
    </NickNameTextFiledLayout>
  );
}

export default NickNameTextFiled;
