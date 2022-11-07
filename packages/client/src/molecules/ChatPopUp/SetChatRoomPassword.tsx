import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import PasswordInput from '../../atoms/input/passwordBox';

/*
 * AsideSearchBox로 감싼 이유는
 * 공통적으로 사용하는 searchBox가 상위 레이아웃에 기반하여 모양을 잡기 때문
 * 예) 상위 레이아웃이 w: 50px에 h: 40px 이면 search box도 마찬가지 크기가 됨.
 */
const SetPasswordLayout = styled('div')(({ theme }) => ({
  width: '90%',
  height: '10%',
  display: 'flex',
  backgroundColor: '#7B61FF66',
  borderRadius: '10px',
  marginBottom: '1%',
}));

const PasswordInputLayout = styled('div')(({ theme }) => ({
  width: '50%',
  height: '10%',
  paddingBottom: '100%',
}));

function SetChatRoomPasswordModule(handler: {
  handler: (props: string) => void;
}) {
  const handlePassword = handler.handler;

  const handlePasswordSet = {
    handlePassword: handlePassword,
  };

  return (
    <SetPasswordLayout>
      <Typography margin="3%" variant="h6">
        비밀번호 입력
      </Typography>
      <PasswordInputLayout>
        <PasswordInput handlers={handlePasswordSet} />
      </PasswordInputLayout>
    </SetPasswordLayout>
  );
}

export default SetChatRoomPasswordModule;
