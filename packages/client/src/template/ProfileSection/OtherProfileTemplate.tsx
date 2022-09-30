import styled from '@emotion/styled';
import UserStat from '../../organisms/ProfileUserStat/UserStat';
import FreindList from '../../organisms/ProfileFreindList/FreindList';
import UserInfo from '../../organisms/ProfileUserInfo/UserInfo';
import MatchHistory from '../../organisms/ProfileMatchHistory/MatchHistory';
import ReceiveMessageAlert from '../../molecules/CommonSection/ReceiveMessageAlert';
import SendMessageAlert from '../../molecules/CommonSection/SendMessageAlert';
import { Footer, ProfileLayout } from '../../pages/PageStyles/ProfilePageCss';
import OtherInfo from '../../organisms/ProfileUserInfo/OtherInfo';

function OtherProfileTemplate() {
  return (
    <ProfileLayout>
      <OtherInfo />
      <FreindList />
      <UserStat />
      <MatchHistory />
      <Footer>{SendMessageAlert('친구')}</Footer>
    </ProfileLayout>
  );
}

export default OtherProfileTemplate;
