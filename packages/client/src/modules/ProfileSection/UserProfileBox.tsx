import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import UserProfileBoxNickname from '../../components/avatar/ProfileBoxNickname';
import AvatarWithCricle from '../../components/avatar/AvartarWithCircle';

const UserProfileBoxLayout = styled(Badge)(({ theme }) => ({
  margin: '1px',
  display: 'flex',
  alignItems: 'center',
}));

function UserProfileBox() {
  return (
    <UserProfileBoxLayout>
      <AvatarWithCricle />
      <UserProfileBoxNickname />
    </UserProfileBoxLayout>
  );
}

export default UserProfileBox;
