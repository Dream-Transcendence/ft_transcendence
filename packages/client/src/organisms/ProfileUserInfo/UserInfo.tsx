import styled from '@emotion/styled';
import ProfileImage from '../../atoms/profile/ProfileImage';
import SecondAuthSwitch from '../../atoms/button/switch/SecondAuth';
import ProfileNickname from '../../atoms/input/ProfileNickname';
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
import axios, { AxiosError } from 'axios';
import { SERVERURL } from '../../configs/Link.url';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BaseUserProfileData } from '../../types/Profile.type';
import { useParams } from 'react-router-dom';
import AddPhotoAlternateTowToneIcon from '@mui/icons-material/AddPhotoAlternate';
import { ReadMoreRounded } from '@mui/icons-material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { userDataAtom } from '../../recoil/user.recoil';
export const UserPictureButtonLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'absolute',
  alignSelf: 'end',
  flexDirection: 'column',
}));

function UserInfo() {
  const { userId } = useParams();
  const [user, setUser] = useRecoilState<BaseUserProfileData>(userDataAtom);
  const [userImage, setUserImage] = useState<FormData | undefined>();

  useEffect(() => {
      if (userImage) {
      axios.post(
        `${SERVERURL}/users/${userId}/image`,
        userImage,
      ).then((response) => {
        setUser({ ...user, image: response.data.image });
        console.log('이미지 변경 성공');
      }).catch ((error) => {
        alert(error);
        console.log('error : ', error);
      })
    }
  }, [userImage, userId])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file) {
        // 낙관적 ui
        console.log(event.target.files[0]);
        let url = URL.createObjectURL(event.target.files[0]);
        setUser({ ...user, image: url });

        //서버 이미지 저장을 위한 form data
        const formData = new FormData();
        formData.append('file', file);
        // let variables = [{
        //   title: "title",
        //   content: "content"
        // },{
        //   title: "title2",
        //   content: "content2"
        // }]    
        // formData.append("data", new Blob([JSON.stringify(variables)], {type: "application/json"}))
        console.log('1 : \n', formData); //빈 객체로 보이는 이유 브라우저 정책이라고 함
        for (var entries of formData.values()) {
          console.log('value :\n', entries);
        }
        setUserImage(formData);
      };
    }
  }

  // const fileUploadProps: CustomIconProps = {
  //   icon: <FileUploadIcon color="disabled" />,
  //   action: changeUserImage,
  // };

  const fileChangeProps: CustomUploadProps = {
    icon: <AddPhotoAlternateTowToneIcon color="disabled" />,
    action: handleChange,
  };

  return (
    <UserInfoLayout>
      <UserPictureLayout>
        <ProfileImage userData={user} />
        <UserPictureButtonLayout>
          <form>
          <FileUploadButton uploadProps={fileChangeProps} />
          {/* <CustomIconButton customProps={fileUploadProps} /> */}
          </form>
        </UserPictureButtonLayout>
      </UserPictureLayout>
      <UserNicknameLayout>
        <ProfileNickname />
      </UserNicknameLayout>
      <ProfileActionLayout>
        <SecondAuthSwitch />
      </ProfileActionLayout>
    </UserInfoLayout>
  );
}

export default UserInfo;
