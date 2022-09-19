import { styled } from '@mui/material/styles';

const UserProfileBoxNicknameLayout = styled('text')(({ theme }) => ({
  margin: '1rem',
}));

function TextBox(props: { value: string }) {
  const { value } = props;

  return <UserProfileBoxNicknameLayout>{value}</UserProfileBoxNicknameLayout>;
}

export default TextBox;
