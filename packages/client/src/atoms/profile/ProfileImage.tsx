import styled from '@emotion/styled';
import UserProfileBox from '../../molecules/ProfileSection/UserProfileBox';
import { Box, CardMedia } from '@mui/material';
import { Image } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { BaseUserProfileData } from '../../types/Profile.type';
import { useRef } from 'react';

function ProfileImage(props: { userData: BaseUserProfileData }) {
  const { nickname, image } = props.userData;
  // [axios GET 요청] 프로필 사진
  return (
    <Box
      component="img"
      sx={{
        height: '100%',
        width: '100%',
      }}
      alt={nickname}
      src={image}
      borderRadius="35%"
    />
  );
}

export default ProfileImage;
