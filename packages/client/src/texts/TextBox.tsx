import { styled } from '@mui/material/styles';

const UserProfileBoxNicknameLayout = styled('span')(({ theme }) => ({
  margin: '1rem',
  flexWrap: 'wrap',
}));

function TextBox(props: {
  value: string | undefined;
  size: string | undefined;
  fontColor: string | undefined;
}) {
  const { value, size, fontColor } = props;

  return (
    <UserProfileBoxNicknameLayout
      style={{
        fontSize: size ? size : '5rem',
        color: fontColor ? fontColor : 'black',
      }}
    >
      {value}
    </UserProfileBoxNicknameLayout>
  );
}

export default TextBox;
