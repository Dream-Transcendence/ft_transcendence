import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ProfileAvatar from '../../atoms/ProfileAvatar';
import UserProfileBoxNickname from '../../atoms/ProfileBoxNickname';
import { Button } from '@mui/material';

const UserProfileBoxLayout = styled(Button)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  textAlign: 'start',
  width: '90%',
  padding: 0,
}));

function UserProfileBox(isButton: Boolean, avaterType: String) {
  return isButton ? (
    <UserProfileBoxLayout>
      {ProfileAvatar(avaterType)}
      <UserProfileBoxNickname />
    </UserProfileBoxLayout>
  ) : (
    <UserProfileBoxLayout disabled>
      {ProfileAvatar(avaterType)}
      <UserProfileBoxNickname />
    </UserProfileBoxLayout>
  );
}

export default UserProfileBox;
