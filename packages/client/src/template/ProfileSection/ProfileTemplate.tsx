import styled from '@emotion/styled';
import UserStat from '../../organisms/ProfileUserStat/UserStat';
import FreindList from '../../organisms/ProfileFreindList/FreindList';
import UserInfo from '../../organisms/ProfileUserInfo/UserInfo';
import MatchHistory from '../../organisms/ProfileMatchHistory/MatchHistory';
import ReceiveMessageAlert from '../../modules/CommonSection/ReceiveMessageAlert';
import SendMessageAlert from '../../modules/CommonSection/SendMessageAlert';

const ProfileLayout = styled('div')(({ theme }) => ({
  gridArea: 'ProfileItems',
  display: 'grid',
  placeContent: 'end',
  backgroundColor: '#6BADE2',
  height: '90%',
  width: '100%',
  gridTemplateColumns: '4fr 5fr',
  gridAutoRows: '14%', //gap의 값(5 * 3%)을 생각하여 계산해야됨
  gap: '3%',
  gridTemplateAreas: `'Profile UserStat' 
                        'Profile UserStat' 
                        'Profile MatchHistory' 
                        'FreindList MatchHistory' 
                        'FreindList MatchHistory' 
                        'FreindList Footer'`,
}));

const Footer = styled('div')(({ theme }) => ({
  gridArea: 'Footer',
  width: '50%',
  height: '100%',
  alignSelf: 'center',
  justifySelf: 'end',
}));

function ProfileTemplate() {
  return (
    <ProfileLayout>
      <UserInfo />
      <FreindList />
      <UserStat />
      <MatchHistory />
      <Footer>{SendMessageAlert('친구')}</Footer>
    </ProfileLayout>
  );
}

export default ProfileTemplate;
