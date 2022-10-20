import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userDataAtom } from '../../pages/PingpongRoutePage';
import { BaseUserProfileData } from '../../types/Profile.type';
import FreindList from '../ProfileFreindList/FreindList';
import OtherInfo from '../ProfileUserInfo/OtherInfo';
import UserInfo from '../ProfileUserInfo/UserInfo';

const ProfilePersonalLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'space-evenly',
  justifySelf: 'space-evenly',
  justifyItems: 'space-evenly',
  justifyContent: 'space-evenly',
  alignItems: 'space-evenly',
  height: '100%',
  width: '100%',
  gridArea: 'ProfilePersonal',
}));

function ProfilePersonal() {
  const user = useRecoilValue<BaseUserProfileData>(userDataAtom);
  const { userId } = useParams();
  return (
    <ProfilePersonalLayout>
      {`${user.id}` === userId ? <UserInfo /> : <OtherInfo />}
      <FreindList />
    </ProfilePersonalLayout>
  );
}

export default ProfilePersonal;
