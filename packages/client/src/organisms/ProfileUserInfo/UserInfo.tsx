import styled from '@emotion/styled';
import ProfileImage from '../../atoms/profile/ProfileImage';
import SecondAuthSwitch from '../../atoms/button/switch/SecondAuth';
import ProfileNicname from '../../atoms/text/ProfileNicname';

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
  display: 'flex',
  flexDirection: 'column',
  height: '60%',
  border: 'solid 1px',
}));

const UserNickname = styled('div')(({ theme }) => ({
  height: '20%',
  border: 'solid 1px',
}));

const SecondAuth = styled('div')(({ theme }) => ({
  height: '20%',
  border: 'solid 1px',
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
      <SecondAuth>
        <SecondAuthSwitch />
      </SecondAuth>
    </UserInfoLayout>
  );
}

export default UserInfo;
