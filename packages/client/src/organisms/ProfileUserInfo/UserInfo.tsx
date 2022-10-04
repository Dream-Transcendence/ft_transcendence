import styled from '@emotion/styled';
import ProfileImage from '../../atoms/profile/ProfileImage';
import SecondAuthSwitch from '../../atoms/button/switch/SecondAuth';
import ProfileNicname from '../../atoms/text/ProfileNicname';
import {
  ProfileActionLayout,
  UserInfoLayout,
  UserNicknameLayout,
  UserPictureLayout,
} from '../OrganismsStyles/ProfileOrganismsCss';
import CustomIconButton from '../../atoms/button/icon/CustomIconButtion';
import InfoBoxNameModule from '../../molecules/ChatSection/RoomInfoBoxName';
import FileUploadButton from '../../atoms/button/icon/FileUploadBotton';
import { CustomIconProps } from '../../types/Link.type';

export const UserPictureButtonLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'absolute',
  alignSelf: 'end',
  flexDirection: 'column',
}));

function UserInfo() {
  const fileUpProps: CustomIconProps = {
    icon: <FileUploadButton />,
  };
  return (
    <UserInfoLayout>
      <UserPictureLayout>
        <ProfileImage />
        <UserPictureButtonLayout>
          {/* [axios POST ? PUT ? 요청] 본인의 프로필 사진 변경을 위한 요청
              - 변경할 프로필 사진 */}
          <CustomIconButton customProps={fileUpProps} />
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
