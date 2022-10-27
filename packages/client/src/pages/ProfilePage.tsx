import styled from '@emotion/styled';
import InviteMessageList from '../organisms/Massage/InviteMessageList';
import ProfileTemplate from '../template/ProfileSection/ProfileTemplate';
import { ProfilePageLayout } from './PageStyles/ProfilePageCss';

function ProfilePage() {
  return (
    <ProfilePageLayout>
      <ProfileTemplate />
      <InviteMessageList />
    </ProfilePageLayout>
  );
}

export default ProfilePage;
