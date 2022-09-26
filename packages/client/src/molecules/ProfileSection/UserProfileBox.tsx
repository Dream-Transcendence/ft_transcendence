import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import AvatarWithCricle from './UserProfileBoxWithCircle';
import { Button } from '@mui/material';
import ProfileAvatar from '../../atoms/profile/ProfileAvatar';
import TextBox from '../../texts/TextBox';

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
      <TextBox value={'doyun'} size={'1rem'} fontColor={'black'} />
    </UserProfileBoxLayout>
  ) : (
    <UserProfileBoxLayout disabled>
      {ProfileAvatar(avaterType)}
      <TextBox value={'doyun'} size={'1rem'} fontColor={'black'} />
    </UserProfileBoxLayout>
  );
}

export default UserProfileBox;