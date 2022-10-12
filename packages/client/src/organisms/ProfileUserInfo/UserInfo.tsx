import styled from '@emotion/styled';
import ProfileImage from '../../atoms/profile/ProfileImage';
import SecondAuthSwitch from '../../atoms/button/switch/SecondAuth';
import ProfileNicname from '../../atoms/input/ProfileNickname';
import {
  ProfileActionLayout,
  UserInfoLayout,
  UserNicknameLayout,
  UserPictureLayout,
} from '../OrganismsStyles/ProfileOrganismsCss';
import CustomIconButton from '../../atoms/button/icon/CustomIconButtion';
import InfoBoxNameModule from '../../molecules/ChatSection/RoomInfoBoxName';
import FileUploadButton from '../../atoms/button/icon/FileUploadBotton';
import { CustomIconProps, CustomUploadProps } from '../../types/Link.type';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { SERVERURL } from '../../configs/Link.url';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BaseUserProfileData } from '../../types/Profile.type';
import { useParams } from 'react-router-dom';
import AddPhotoAlternateTowToneIcon from '@mui/icons-material/AddPhotoAlternate';
import { userDataAtom } from '../../pages/PingpongRoutePage';

export const UserPictureButtonLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'absolute',
  alignSelf: 'end',
  flexDirection: 'column',
}));

function UserInfo() {
  const { userId } = useParams();
  const [user, setUser] = useRecoilState<BaseUserProfileData>(userDataAtom);

  // const refImage = useRef<HTMLInputElement>(null);
  // const uploadHandler = () => {
  //   console.log('hi');
  //   // refImage.current.value = image;
  // };
  const fileUpProps: CustomUploadProps = {
    icon: <AddPhotoAlternateTowToneIcon color="disabled" />,
    // ref: { refImage },
    // action: uploadHandler,
  };

  useEffect(() => {
    async function getUserData() {
      try {
        const response = await axios.get(
          `${SERVERURL}/users/${userId}/profile`,
        );
        setUser(response.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
    getUserData();
  }, [userId, setUser]);

  return (
    <UserInfoLayout>
      <UserPictureLayout>
        <ProfileImage userData={user} />
        <UserPictureButtonLayout>
          {/* [axios POST ? PUT ? 요청] 본인의 프로필 사진 변경을 위한 요청
              - 변경할 프로필 사진 -> 전체 라우트 위치에서 유저 데이터 한번에 요청 */}
          <FileUploadButton uploadProps={fileUpProps} />
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
