import styled from '@emotion/styled';
import ProfileImage from '../../atoms/ProfileImage';
import ProfileNicname from '../../components/text/ProfileNicname';

const UserInfoLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'end',
  justifySelf: 'end',
  height: '80%',
  width: '55%',
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
      <UserPicture>
        <ProfileImage />
      </UserPicture>
      <UserNickname>
        <ProfileNicname />
      </UserNickname>
      <SecondAuth>SecondAuth</SecondAuth>
    </UserInfoLayout>
  );
}

export default UserInfo;
