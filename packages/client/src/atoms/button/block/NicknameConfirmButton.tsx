import styled from '@emotion/styled';
import { Button } from '@mui/material';

const NicknameConfirmBottonLayout = styled('button')(({ theme }) => ({
  alignContents: 'center',
  backgroundColor: '#1976D2',
  width: '100%',
  height: '40%',
}));

function NicknameConfirmButton() {
  return (
    <NicknameConfirmBottonLayout>
      <Button sx={{ gap: 0, p: 0, color: 'white' }} variant="text">
        확인
      </Button>
    </NicknameConfirmBottonLayout>
  );
}

export default NicknameConfirmButton;
