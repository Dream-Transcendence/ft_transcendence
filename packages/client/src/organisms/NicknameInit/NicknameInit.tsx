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
  border: 'solid 1px',
}));

function NicknameInit() {
  const [nickname, setNickname] = useState<string>('');

  const controlNickname = {
    nickname: nickname,
    setNickname: setNickname,
  };

  return (
    <NicknameInitLayout>
      <NickNameTextField controlNickname={controlNickname} />
      <NicknameConfirmButton controlNickname={controlNickname} />
    </NicknameInitLayout>
  );
}

export default NicknameInit;
