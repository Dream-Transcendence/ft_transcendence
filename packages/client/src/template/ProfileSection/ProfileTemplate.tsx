import styled from '@emotion/styled';
import UserStat from '../../organisms/ProfileUserStat/UserStat';
import FreindList from '../../organisms/ProfileFreindList/FreindList';
import UserInfo from '../../organisms/ProfileUserInfo/UserInfo';
import MatchHistory from '../../organisms/ProfileMatchHistory/MatchHistory';
import ReceiveMessageAlert from '../../molecules/CommonSection/ReceiveMessageAlert';
import SendMessageAlert from '../../molecules/CommonSection/SendMessageAlert';
import { Footer as Popup, ProfileLayout } from '../../pages/PageStyles/ProfilePageCss';
import OtherInfo from '../../organisms/ProfileUserInfo/OtherInfo';
import { atom, RecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { baseUserProfileData, isUserProfilePage } from '../../pages/PingpongRoutePage';
import { BaseUserProfileData, IsUserProfilePage } from '../../types/Profile.type';

// interface userState {
//   isLogin: boolean,
//   image: string,
//   secondAuth: boolean,
//   freineds
//   stat
//   history
// }

//하위 컴포넌트에서


function ProfileTemplate() {
  const [userData, setUserState] = useRecoilState<BaseUserProfileData>(baseUserProfileData);
  const isUser = useRecoilValue<IsUserProfilePage>(isUserProfilePage);

  return (
    <ProfileLayout>
      {isUser && <UserInfo />}
      {!isUser && <OtherInfo />}
      <FreindList />
      <UserStat />
      <MatchHistory />
      <Popup>{SendMessageAlert('친구')}</Popup>
    </ProfileLayout>
  );
}

export default ProfileTemplate;
