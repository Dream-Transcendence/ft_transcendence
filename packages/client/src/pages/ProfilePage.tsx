import styled from '@emotion/styled';
import InviteMassageList from '../organisms/Massage/InviteMassageList';
import ProfileTemplate from '../template/ProfileSection/ProfileTemplate';
import { ProfilePageLayout } from './PageStyles/ProfilePageCss';

const InviteMassageListLayout = styled('div')(({theme}) => ({
  bottom: '0',
  right: '0',
  position: 'absolute',
  width: '30%',
  height: '10%',
  overflow: 'hidden',
}))

function ProfilePage() {
  return (
    <ProfilePageLayout>
      <ProfileTemplate />
      <InviteMassageListLayout>
        <InviteMassageList />
      </InviteMassageListLayout>
    </ProfilePageLayout>
  );
}

export default ProfilePage;
