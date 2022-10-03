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
import OtherProfileNicname from '../../atoms/text/OtherProfileNicname';
import CustomIconButton from '../../atoms/button/icon/CustomIconButtion';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { CustomIconProps } from '../../types/Link.type';

function OtherInfo() {
  const customProps: CustomIconProps = {
    icon: <PersonAddIcon />,
  };
  return (
    <UserInfoLayout>
      <UserPictureLayout>
        <ProfileImage />
      </UserPictureLayout>
      <UserNicknameLayout>
        <OtherProfileNicname />
      </UserNicknameLayout>
      <ProfileActionLayout>
        {/* [Socket IO 요청] 상대방에게 친구수락 팝업 뜨게할 것 */}
        <CustomIconButton customProps={customProps} />
      </ProfileActionLayout>
    </UserInfoLayout>
  );
}

export default OtherInfo;
