import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import AvatarWithCricle from './UserProfileBoxWithCircle';
import { Button } from '@mui/material';
import ProfileAvatar from '../../atoms/ProfileAvatar';
import TextBox from '../../atoms/TextBox';

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
      <TextBox value={'doyun'} />
    </UserProfileBoxLayout>
  ) : (
    <UserProfileBoxLayout disabled>
      {ProfileAvatar(avaterType)}
      <TextBox value={'doyun'} />
    </UserProfileBoxLayout>
  );
}

export default UserProfileBox;
