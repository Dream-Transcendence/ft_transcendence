import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { ControlNickname } from '../../types/Profile.type';

const NickNameTextFieldLayout = styled('span')(({ theme }) => ({
  alignSelf: 'center',
  backgroundColor: '#00ff0000',
  width: '100%',
  height: '60%',
}));

function NickNameTextField(props: { controlNickname: ControlNickname }) {
  const { setNickname } = props.controlNickname;

  const HandleNickName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const values = event.target.value;
    setNickname(values);
  };

  return (
    <NickNameTextFieldLayout>
      <TextField
        id="nickName"
        label="닉네임을 입력하세요."
        variant="filled"
        fullWidth
        onChange={HandleNickName}
      />
    </NickNameTextFieldLayout>
  );
}

export default NickNameTextField;
