import styled from '@emotion/styled';
import NicknameConfirmButton from '../../atoms/button/block/NicknameConfirmButton';
import NickNameTextFiled from '../../atoms/text/NicknameInitTextField';

const NicknameInitLayout = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyItems: 'center',
  backgroundColor: '#0288D1',
  width: '24%',
  height: '10%',
  border: 'solid 1px',
}));

function NicknameInit() {
  return (
    <NicknameInitLayout>
      <NickNameTextFiled />
      <NicknameConfirmButton />
    </NicknameInitLayout>
  );
}

export default NicknameInit;
