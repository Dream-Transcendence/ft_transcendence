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
  const [userImage, setUserImage] = useState<string>('');

  async function changeUserImage() {
    try {
      // const imageData = new FormData();
      // imageData.set('file', userImage, 'filenames');
      // console.log(imageData.get('file'));
      console.log(userImage);
      setUser({ ...user, image: userImage });

      const response = await axios.patch(
        `${SERVERURL}/users/${userId}/profile`,
        { image: userImage },
      );
      if (response.status === 200) {
        console.log('이미지 변경 성공');
        setUser({ ...user, image: userImage });
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      // const file = event.target.files[0];
      // const reader = new FileReader();
      // console.log(reader);
      // reader.readAsDataURL(file);
      // setUserImage(reader.result);
      // console.log(userImage);
      // console.log('aa', event.currentTarget.files[0]);

      console.log(event.target.files[0]);
      let url = URL.createObjectURL(event.target.files[0]);
      setUserImage(url);
      console.log(url);
    }
  };

  const fileChangeProps: CustomUploadProps = {
    icon: <AddPhotoAlternateTowToneIcon color="disabled" />,
    action: handleChange,
  };

  const fileUploadProps: CustomUploadProps = {
    icon: <AddPhotoAlternateTowToneIcon color="disabled" />,
    action: changeUserImage,
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
          <FileUploadButton uploadProps={fileChangeProps} />
          <FileUploadButton uploadProps={fileUploadProps} />
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
