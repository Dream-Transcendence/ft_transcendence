import styled from '@emotion/styled';
import UserProfileBox from '../../modules/ProfileSection/UserProfileBox';

const UserInfoLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'end',
  justifySelf: 'end',
  height: '80%',
  width: '70%',
  gridArea: 'Profile',
  backgroundColor: '#1976D2',
}));

const UserPicture = styled('div')(({ theme }) => ({
  height: '60%',
  border: 'solid',
}));

const UserNickname = styled('div')(({ theme }) => ({
  height: '20%',
  border: 'solid',
}));

const SecondAuth = styled('div')(({ theme }) => ({
  height: '20%',
  border: 'solid',
}));

function UserInfo() {
  return (
    <UserInfoLayout>
      <UserPicture>UserPicture</UserPicture>
      <UserNickname>UserNickname</UserNickname>
      <SecondAuth>SecondAuth</SecondAuth>
    </UserInfoLayout>
  );
}

export default UserInfo;
