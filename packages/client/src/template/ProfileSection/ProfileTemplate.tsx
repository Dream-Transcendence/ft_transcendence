import styled from '@emotion/styled';
import UserStat from '../../organisms/ProfileUserStat/UserStat';
import FreindList from '../../organisms/ProfileFreindList/FreindList';
import UserInfo from '../../organisms/ProfileUserInfo/UserInfo';
import MatchHistory from '../../organisms/ProfileMatchHistory/MatchHistory';
import ReceiveMessageAlert from '../../molecules/CommonSection/ReceiveMessageAlert';
import SendMessageAlert from '../../molecules/CommonSection/SendMessageAlert';
import {
  Footer as Popup,
  ProfileLayout,
} from '../../pages/PageStyles/ProfilePageCss';
import OtherInfo from '../../organisms/ProfileUserInfo/OtherInfo';
import { userSpot } from '../../pages/PingpongRoutePage';
import { BaseUserProfileData } from '../../types/Profile.type';
import { useRecoilState, useRecoilValue } from 'recoil';

function ProfileTemplate() {
  const spot = useRecoilValue<string>(userSpot);

  return (
    <ProfileLayout>
      {spot === 'profile' && <UserInfo />}
      {spot === 'otherProfile' && <OtherInfo />}
      <FreindList />
      <UserStat />
      <MatchHistory />
      <Popup>{SendMessageAlert('친구')}</Popup>
    </ProfileLayout>
  );
}

export default ProfileTemplate;
