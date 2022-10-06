import { useRecoilValue } from 'recoil';
import { userDataAtom } from '../../pages/PingpongRoutePage';
import { BaseUserProfileData } from '../../types/Profile.type';
import ProfileAvatar from './ProfileAvatar';

export default function NavProfile() {
  const user = useRecoilValue<BaseUserProfileData>(userDataAtom);

  return <ProfileAvatar avatarType="default" avartarProps={user} />;
}
