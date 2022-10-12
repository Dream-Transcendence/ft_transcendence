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
import { useRecoilValue } from 'recoil';
import { userDataAtom } from '../../pages/PingpongRoutePage';

function OtherInfo() {
  const { id } = useRecoilValue(userDataAtom);
  const { userId: otherId } = useParams();
  const [userData, setUserData] = useState<BaseUserProfileData>({
    id: 0,
    nickname: 'noname',
    image: 'noimage',
  });
  async function addFriend() {
    try {
      /**
       * 1. 소켓으로 친구 요청 메시지를 보내기
       * 2. 요청 전송완료 alert 띄워 주어야 함
       * 3. 수락시 post 보내기
       */
      const responseReq = await axios.post(
        `${SERVERURL}/users/${id}/requests`,
        {
          id: otherId,
        },
      );
      if (responseReq.status === 409) {
        console.log('already friend');
      }
      const responseAdd = await axios.post(`${SERVERURL}/users/${id}/friends`, {
        id: otherId,
      });
      if (responseAdd.status === 201) {
        console.log('친구추가 완료');
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }
  const customProps: CustomIconProps = {
    icon: <PersonAddIcon />,
    action: addFriend,
  };
  useEffect(() => {
    async function getUserData() {
      try {
        const response = await axios.get(
          `${SERVERURL}/users/${otherId}/profile`,
        );
        setUserData(response.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
    getUserData();
  }, [otherId]);
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
