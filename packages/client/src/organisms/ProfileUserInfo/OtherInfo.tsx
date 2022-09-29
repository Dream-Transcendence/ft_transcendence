import styled from '@emotion/styled';
import ProfileImage from '../../atoms/profile/ProfileImage';
import SecondAuthSwitch from '../../atoms/button/switch/SecondAuth';
import ProfileNicname from '../../atoms/text/ProfileNicname';
import { ProfileActionLayout, UserInfoLayout, UserNicknameLayout, UserPictureLayout } from '../OrganismsStyles/ProfileOrganismsCss';
import OtherProfileNicname from '../../atoms/text/OtherProfileNicname';
import CustomIconButton from '../../atoms/button/icon/CustomIconButtion';
import PersonAddIcon from '@mui/icons-material/PersonAdd';


function OtherInfo() {
    return (
        <UserInfoLayout>
            <UserPictureLayout>
                <ProfileImage />
            </UserPictureLayout>
            <UserNicknameLayout>
                <OtherProfileNicname />
            </UserNicknameLayout>
            <ProfileActionLayout>
                <CustomIconButton element={<PersonAddIcon />} />
            </ProfileActionLayout>
        </UserInfoLayout>
    );
}

export default OtherInfo;