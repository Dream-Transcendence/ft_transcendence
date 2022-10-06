import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import ProfileAvatar from '../../atoms/profile/ProfileAvatar';
import TextBox from '../../texts/TextBox';
import { UserProfileBoxType } from '../../types/Profile.type';

const UserProfileBoxLayout = styled(Button)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  textAlign: 'start',
  width: '100%',
  height: '100%',
  padding: '0',
  marginLeft: '0.3rem',
}));

function UserProfileBox(props: { userProfileBoxProps: UserProfileBoxType }) {
  const { isButton, avatarType, userData, action } = props.userProfileBoxProps;
  const { user } = userData;

  return (
    <UserProfileBoxLayout disabled={!isButton} onClick={action}>
      <ProfileAvatar avatarType={avatarType} avartarProps={userData} />
      <TextBox value={user.nickname} size={'1rem'} fontColor={'black'} />
    </UserProfileBoxLayout>
  );
}

export default UserProfileBox;
