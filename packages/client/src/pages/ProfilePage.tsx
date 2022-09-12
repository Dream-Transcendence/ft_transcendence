import styled from '@emotion/styled';
import { Directions, Repeat } from '@mui/icons-material';
import UserProfileCard from '../components/avatar/UserProfileCard';
import NavigationBar from '../components/bar/NavigationBar';

const ProfileLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#6BADE2',
  height: '100%',
  width: '100%',
  gridTemplateRows: '10% 90%',
  gridTemplateAreas: `'NavGridLayout'
	                  'ProfileItems'`,
}));

const NavGridLayout = styled('div')(({ theme }) => ({
  gridArea: 'NavGridLayout',
}));

const ProfileItems = styled('div')(({ theme }) => ({
  gridArea: 'ProfileItems',
  display: 'grid',
  placeContent: 'end',
  backgroundColor: '#6BADE2',
  height: '100%',
  width: '100%',
  gridTemplateColumns: '4fr 5fr',
  gridAutoRows: '14%', //gap의 값(5 * 3%)을 생각하여 계산해야됨
  gap: '3%',
  gridTemplateAreas: `'Profile UserStat' 
                      'Profile UserStat' 
                      'Profile MatchHistory' 
                      'FreindList MatchHistory' 
                      'FreindList MatchHistory' 
	                  'FreindList MatchHistory'`,
}));

const Profile = styled('div')(({ theme }) => ({
  alignSelf: 'end',
  justifySelf: 'end',
  height: '80%',
  width: '70%',
  gridArea: 'Profile',
  backgroundColor: '#1976D2',
}));

const FreindList = styled('div')(({ theme }) => ({
  alignSelf: 'start',
  justifySelf: 'end',
  height: '75%',
  width: '65%',
  gridArea: 'FreindList',
  backgroundColor: '#1976D2',
}));

const UserStat = styled('div')(({ theme }) => ({
  alignSelf: 'end',
  justifySelf: 'start',
  height: '30%',
  width: '85%',
  gridArea: 'UserStat',
  backgroundColor: '#1976D2',
}));

const MatchHistory = styled('div')(({ theme }) => ({
  height: '85%',
  width: '80%',
  gridArea: 'MatchHistory',
  backgroundColor: '#1976D2',
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
      <ProfileItems>
        <Profile>l</Profile>
        <FreindList>a</FreindList>
        <UserStat>d</UserStat>
        <MatchHistory>s</MatchHistory>
      </ProfileItems>
    </ProfileLayout>
  );
}

export default ProfilePage;
