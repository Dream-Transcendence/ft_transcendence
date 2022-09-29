import styled from '@emotion/styled';
import ProfileImage from '../../atoms/profile/ProfileImage';
import SecondAuthSwitch from '../../atoms/button/switch/SecondAuth';
import ProfileNicname from '../../atoms/text/ProfileNicname';
import { ProfileActionLayout, UserInfoLayout, UserNicknameLayout, UserPictureLayout } from '../OrganismsStyles/ProfileOrganismsCss';
import CustomIconButton from '../../atoms/button/icon/CustomIconButtion';
import InfoBoxNameModule from '../../molecules/ChatSection/RoomInfoBoxName';
import FileUploadButton from '../../atoms/button/icon/FileUploadBotton';

export const UserPictureButtonLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'absolute',
  alignSelf: 'end',
  flexDirection: 'column',
}));

function UserInfo() {
  return (
    <UserInfoLayout>
      <UserPictureLayout>
        <ProfileImage />
        <UserPictureButtonLayout>
          <CustomIconButton element={<FileUploadButton />} />
        </UserPictureButtonLayout>
      </UserPictureLayout>
      <UserNicknameLayout>
        <ProfileNicname />
      </UserNicknameLayout>
      <ProfileActionLayout>
        <SecondAuthSwitch />
      </ProfileActionLayout>
    </UserInfoLayout>
  );
}


export default UserInfo;
