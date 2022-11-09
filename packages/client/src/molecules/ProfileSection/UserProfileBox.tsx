import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import ProfileAvatar from '../../atoms/profile/ProfileAvatar';
import TextBox from '../../texts/TextBox';
import { UserProfileBoxType } from '../../types/Profile.type';

const UserProfileBoxLayout = styled(Button)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start', //좌측 정렬
  textAlign: 'start',
  width: '100%',
  height: '20%',
  padding: '0',
  marginLeft: '0.3rem',
  textTransform: 'unset',
}));

function UserProfileBox(props: { userProfileBoxProps: UserProfileBoxType }) {
  const { isButton, avatarType, userData, action } = props.userProfileBoxProps;
  return (
    <UserProfileBoxLayout disabled={!isButton} onClick={action}>
      <ProfileAvatar avatarType={avatarType} avartarProps={userData} />
      <TextBox value={userData.nickname} size={'1rem'} fontColor={'black'} />
    </UserProfileBoxLayout>
  );
}

export default UserProfileBox;
