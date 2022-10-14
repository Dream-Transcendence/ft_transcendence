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
import { ReadMoreRounded } from '@mui/icons-material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
export const UserPictureButtonLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'absolute',
  alignSelf: 'end',
  flexDirection: 'column',
}));

function UserInfo() {
  const { userId } = useParams();
  const [user, setUser] = useRecoilState<BaseUserProfileData>(userDataAtom);
  const [userImage, setUserImage] = useState('');
  async function changeUserImage() {
    try {
      const response = await axios.patch(
        `${SERVERURL}/users/${userId}/profile`,
        { image: userImage },
      );
      if (response.status === 200) {
        setUser({ ...user, image: userImage });
        console.log('이미지 변경 성공');
        console.log(user.image);
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  let reader = new FileReader();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      //blob으로 저장하여 이미지의 생명이 짧음, formData로 보내야 할 것 같은데 서버의 받는 구조가 바뀌어야 함
      //기본 이미지의 타입은 string인데 formData는 객체임.
      //-> reader로 구현하였음.
      // console.log(event.target.files[0]);
      // let url = URL.createObjectURL(event.target.files[0]);
      // setUserImage(url);
      const file = event.target.files[0];
      if (file) {
        reader.readAsDataURL(file);
        reader.onloadend = () => { //비동기 로직임
          if (reader.result) {
            if (typeof reader.result === 'string') {
              // setUser({ ...user, image: reader.result });
              setUserImage(reader.result);
            } else {
              alert('처리할 수 없는 이미지입니다.')
            }
          }
        }
        // changeUserImage(); //비동기 로직 끝난 뒤 그 값을 받아야 함
      }
    }
  };

  const fileUploadProps: CustomIconProps = {
    icon: <FileUploadIcon color="disabled" />,
    action: changeUserImage,
  };

  const fileChangeProps: CustomUploadProps = {
    icon: <AddPhotoAlternateTowToneIcon color="disabled" />,
    action: handleChange,
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
          <span>
            <FileUploadButton uploadProps={fileChangeProps} />
            <CustomIconButton customProps={fileUploadProps} />
          </span>
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
