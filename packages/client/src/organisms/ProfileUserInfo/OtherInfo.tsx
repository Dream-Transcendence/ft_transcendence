import ProfileImage from '../../atoms/profile/ProfileImage';
import SecondAuthSwitch from '../../atoms/button/switch/SecondAuth';
import ProfileNicname from '../../atoms/text/ProfileNickname';
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
import { useEffect, useState } from 'react';
import { BaseUserProfileData } from '../../types/Profile.type';
import axios from 'axios';
import { SERVERURL } from '../../configs/Link.url';
import { useParams } from 'react-router-dom';
import { AlternateEmailTwoTone } from '@mui/icons-material';

function OtherInfo() {
  const { userId } = useParams();
  const [userData, setUserData] = useState<BaseUserProfileData>({
    id: 0,
    nickname: 'noname',
    image: 'noimage',
  });
  const customProps: CustomIconProps = {
    icon: <PersonAddIcon />,
    action: () => {
      async function addFriend() {
        try {//[doyun]api주소 수정 필요함
          const response = await axios.post(`${SERVERURL}/users/${userId}friends`);
        } catch (error) {
          alert(error);

          console.log(error);
        }
      }
    }
  };
  useEffect(() => {
    async function getUserData() {
      try {
        const response = await axios.get(
          `${SERVERURL}/users/${userId}/profile`,
        );
        setUserData(response.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
    getUserData();
  }, [userId]);
  return (
    <UserInfoLayout>
      <UserPictureLayout>
        <ProfileImage userData={userData} />
      </UserPictureLayout>
      <UserNicknameLayout>
        <OtherProfileNicname userData={userData} />
      </UserNicknameLayout>
      <ProfileActionLayout>
        {/* [Socket IO 요청] 상대방에게 친구수락 팝업 뜨게할 것 */}
        <CustomIconButton customProps={customProps} />
      </ProfileActionLayout>
    </UserInfoLayout>
  );
}

export default OtherInfo;
