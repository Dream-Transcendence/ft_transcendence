import styled from '@emotion/styled';
import UserProfileBox from '../modules/ProfileSection/UserProfileBox';
import { Box, CardMedia } from '@mui/material';
import { Image } from '@chakra-ui/react';

function ProfileImage() {
  return (
    <Box
      component="img"
      sx={{
        height: '100%',
        width: '100%',
      }}
      alt="UserPicture"
      src="https://cdn.intra.42.fr/users/sonkang.jpg"
      borderRadius="35%"
    />
  );
}

export default ProfileImage;
