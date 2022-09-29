import styled from '@emotion/styled';
import NavigationBar from '../atoms/bar/NavigationBar';
import OtherProfileTemplate from '../template/ProfileSection/OtherProfileTemplate';
import ProfileTemplate from '../template/ProfileSection/ProfileTemplate';
import { ProfilePageLayout } from './PageStyles/ProfilePageCss';

function OtherProfilePage() {
    return (
        <ProfilePageLayout>
            <OtherProfileTemplate />
        </ProfilePageLayout>
    );
}

export default OtherProfilePage;
