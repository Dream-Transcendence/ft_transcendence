import styled from '@emotion/styled';
import { Button } from '@mui/material';

const NicknameConfirmBottonLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: '#1976D2',
  width: '100%',
  height: '50%',
}));

function NicknameConfirmButton() {
  const handler = () => {
    //닉네임 중복인지 확인하는 부분 필요함
  };
  return (
    <NicknameConfirmBottonLayout>
      {/* [axios POST 요청] 서버 측으로 닉네임 전달 */}
      <Button fullWidth variant="contained" onClick={handler}>
        확인
      </Button>
    </NicknameConfirmBottonLayout>
  );
}

export default NicknameConfirmButton;
