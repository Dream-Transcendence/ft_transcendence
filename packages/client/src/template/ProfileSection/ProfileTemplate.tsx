import UserStat from '../../organisms/ProfileUserStat/UserStat';
import MatchHistory from '../../organisms/ProfileMatchHistory/MatchHistory';
import { ProfileLayout } from '../../pages/PageStyles/ProfilePageCss';
import ProfilePersonal from '../../organisms/ProfilePersonal/ProfilePersonal';

function ProfileTemplate() {
  return (
    <ProfileLayout>
      <ProfilePersonal />
      <UserStat />
      <MatchHistory />
    </ProfileLayout>
  );
}

export default ProfileTemplate;
