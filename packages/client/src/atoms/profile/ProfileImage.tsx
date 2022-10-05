import styled from '@emotion/styled';
import UserProfileBox from '../../molecules/ProfileSection/UserProfileBox';
import { Box, CardMedia } from '@mui/material';
import { Image } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { reqUserData } from '../../template/ProfileSection/ProfileTemplate';

function ProfileImage() {
  const reqUser = useRecoilValue(reqUserData);
  // [axios GET 요청] 프로필 사진
  return (
    <Box
      component="img"
      sx={{
        height: '100%',
        width: '100%',
      }}
      alt="UserPicture"
      src={reqUser.image}
      borderRadius="35%"
    />
  );
}

export default ProfileImage;
