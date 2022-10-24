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
  backgroundColor: '#1976D2',
}));

export const UserPictureLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'end',
  height: '60%',
  border: 'solid 1px',
}));

export const UserNicknameLayout = styled('div')(({ theme }) => ({
  height: '20%',
  width: '99%',
  border: 'solid 1px',
}));

export const ProfileActionLayout = styled('div')(({ theme }) => ({
  height: '20%',
  width: '99%',
  border: 'solid 1px',
}));
