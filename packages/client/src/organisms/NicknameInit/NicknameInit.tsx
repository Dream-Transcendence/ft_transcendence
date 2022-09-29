import styled from '@emotion/styled';
import { useState } from 'react';
import NicknameConfirmButton from '../../atoms/button/block/NicknameConfirmButton';
import NickNameTextField from '../../atoms/text/NicknameInitTextField';

const NicknameInitLayout = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyItems: 'center',
  backgroundColor: '#0288D1',
  width: '24%',
  height: '8%',
  border: 'solid 1px',
}));

function NicknameInit() {
  const [nickname, setNickname] = useState<string | null>(null);;

  const confirmNicknameHandler = (nickname: string): void => {
    setNickname(nickname);
  }
  return (
    <NicknameInitLayout>
      <NickNameTextField />
      <NicknameConfirmButton />
    </NicknameInitLayout>
  );
}

export default NicknameInit;
