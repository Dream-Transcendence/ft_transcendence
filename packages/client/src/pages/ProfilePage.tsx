import InviteMessageList from '../organisms/Massage/InviteMessageList';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userDataAtom, userSecondAuth } from '../recoil/user.recoil';
import ProfileTemplate from '../template/ProfileSection/ProfileTemplate';
import { UserSecondAuth } from '../types/Profile.type';
import { ProfilePageLayout } from './PageStyles/ProfilePageCss';

function ProfilePage() {
  const passSecondOauth = useRecoilValue<UserSecondAuth>(userSecondAuth);
  const userData = useRecoilValue(userDataAtom);
  const navigate = useNavigate();

  useEffect(() => {
    //정상적인 접근인지 판단하는 로직
    if (userData.id === 0 || passSecondOauth.checkIsValid === false) {
      navigate('/');
    }
  }, [userData.id, passSecondOauth, navigate]);
  return (
    <ProfilePageLayout>
      <ProfileTemplate />
      <InviteMessageList />
    </ProfilePageLayout>
  );
}

export default ProfilePage;
