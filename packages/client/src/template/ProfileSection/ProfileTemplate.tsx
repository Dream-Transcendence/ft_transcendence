import styled from '@emotion/styled';
import UserStat from '../../organisms/ProfileUserStat/UserStat';
import FreindList from '../../organisms/ProfileFreindList/FreindList';
import UserInfo from '../../organisms/ProfileUserInfo/UserInfo';
import MatchHistory from '../../organisms/ProfileMatchHistory/MatchHistory';

const ProfileLayout = styled('div')(({ theme }) => ({
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

function ProfileTemplate() {
  return (
    <ProfileLayout>
      <UserInfo />
      <FreindList />
      <UserStat />
      <MatchHistory />
    </ProfileLayout>
  );
}

export default ProfileTemplate;
