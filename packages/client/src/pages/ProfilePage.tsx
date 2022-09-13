import styled from '@emotion/styled';
import NavigationBar from '../components/bar/NavigationBar';
import ProfileTemplate from '../template/ProfileSection/ProfileTemplate';

const ProfileLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#6BADE2',
  height: '100%',
  width: '100%',
}));

const NavGridLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '10%',
}));

const Footer = styled('div')(({ theme }) => ({
  gridArea: 'Footer',
  backgroundColor: 'brown',
}));

function ProfilePage() {
  return (
    <ProfileLayout>
      <NavGridLayout>
        <NavigationBar></NavigationBar>
      </NavGridLayout>
      <ProfileTemplate />
    </ProfileLayout>
  );
}

export default ProfilePage;
