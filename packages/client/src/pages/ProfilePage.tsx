import ProfileTemplate from '../template/ProfileSection/ProfileTemplate';
import { ProfilePageLayout } from './PageStyles/ProfilePageCss';


function ProfilePage() {
  return (
    <ProfilePageLayout>
      <ProfileTemplate />
    </ProfilePageLayout>
  );
}

export default ProfilePage;
