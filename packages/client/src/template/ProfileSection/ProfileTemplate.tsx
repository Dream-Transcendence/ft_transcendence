import UserStat from '../../organisms/ProfileUserStat/UserStat';
import MatchHistory from '../../organisms/ProfileMatchHistory/MatchHistory';
import SendMessageAlert from '../../molecules/CommonSection/SendMessageAlert';
import {
  Footer as Popup,
  ProfileLayout,
} from '../../pages/PageStyles/ProfilePageCss';
import { BaseUserProfileData } from '../../types/Profile.type';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import { userDataAtom } from '../../pages/PingpongRoutePage';
import ProfilePersonal from '../../organisms/ProfilePersonal/ProfilePersonal';

function ProfileTemplate() {
  const user = useRecoilValue<BaseUserProfileData>(userDataAtom);
  const { userId } = useParams();
  return (
    <ProfileLayout>
      <ProfilePersonal />
      <UserStat />
      <MatchHistory />
    </ProfileLayout>
  );
}

export default ProfileTemplate;
