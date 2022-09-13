import { styled } from '@mui/material/styles';

const UserProfileBoxNicknameLayout = styled('text')(({ theme }) => ({
  marginLeft: '1rem',
}));

function UserProfileBoxNickname() {
  let defaultNickname = 'doyun'; //파라미터로 값 받는 것으로 수정 필요

  return (
    <UserProfileBoxNicknameLayout>
      {defaultNickname}
    </UserProfileBoxNicknameLayout>
  );
}

export default UserProfileBoxNickname;
