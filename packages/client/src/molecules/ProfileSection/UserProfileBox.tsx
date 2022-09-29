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
  width: '100%',
  padding: '0',
  marginLeft: '0.3rem',
}));

function UserProfileBox(props: { isButton: Boolean, avatarType: String }) {
  const { isButton, avatarType } = props;
  return isButton ? (
    <UserProfileBoxLayout>
      <ProfileAvatar avatarType={avatarType} />
      <TextBox value={'doyun'} size={'1rem'} fontColor={'black'} />
    </UserProfileBoxLayout>
  ) : (
    <UserProfileBoxLayout disabled>
      <ProfileAvatar avatarType={avatarType} />
      <TextBox value={'doyun'} size={'1rem'} fontColor={'black'} />
    </UserProfileBoxLayout>
  );
}

export default UserProfileBox;
