import { atom } from 'recoil';
import ProfileTemplate from '../template/ProfileSection/ProfileTemplate';
import { BaseUserProfileData } from '../types/Profile.type';
import { ProfilePageLayout } from './PageStyles/ProfilePageCss';

function ProfilePage() {
  return (
    <ProfilePageLayout>
      <ProfileTemplate />
    </ProfilePageLayout>
  );
}

export default ProfilePage;
