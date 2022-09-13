import styled from '@emotion/styled';
import NicknameInit from '../organisms/NicknameInit/NicknameInit';
import { TextField } from '@mui/material';

const NicknamePageLayout = styled('div')(({ theme }) => ({
  display: 'grid',
  alignItems: 'center',
  justifyItems: 'center',
  backgroundColor: '#6BADE2',
  width: '100%',
  height: '100%',
}));

function NicknamePage() {
  return (
    <NicknamePageLayout>
      <NicknameInit />
    </NicknamePageLayout>
  );
}

export default NicknamePage;
