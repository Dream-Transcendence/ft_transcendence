import styled from '@emotion/styled';

//User와 Other의 공통 degine
export const UserInfoLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'end',
  justifySelf: 'end',
  height: '47%',
  width: '55%',
  gridArea: 'Profile',
  borderRadius: '7%',

  background:
    'linear-gradient(135deg,rgba(110,177,255,1) 0%,rgba(118,0,255,1) 120%)',
  boxShadow: '0 15px 35px #00000066',
}));

export const UserPictureLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  padding: '3%',
  flexDirection: 'column',
  justifyContent: 'end',
  height: '60%',
}));

export const UserNicknameLayout = styled('div')(({ theme }) => ({
  height: '20%',
  width: '99%',
}));

export const ProfileActionLayout = styled('div')(({ theme }) => ({
  height: '20%',
  width: '99%',
}));
