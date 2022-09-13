import styled from '@emotion/styled';

const FreindListLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'start',
  justifySelf: 'end',
  height: '75%',
  width: '65%',
  gridArea: 'FreindList',
  backgroundColor: '#1976D2',
}));

const UserPicture = styled('div')(({ theme }) => ({
  height: '60%',
}));

const UserNickname = styled('div')(({ theme }) => ({
  height: '20%',
}));

const SecondAuth = styled('div')(({ theme }) => ({
  height: '20%',
}));

function FreindList() {
  return <FreindListLayout>freind list</FreindListLayout>;
}

export default FreindList;
