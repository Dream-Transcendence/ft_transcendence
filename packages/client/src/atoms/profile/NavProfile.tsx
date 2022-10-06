import { useRecoilValue } from 'recoil';
import { userAtom } from '../../pages/PingpongRoutePage';
import { BaseUserProfileData } from '../../types/Profile.type';
import ProfileAvatar from './ProfileAvatar';

export default function NavProfile() {
  const user = useRecoilValue<BaseUserProfileData>(userAtom);

  return <ProfileAvatar avatarType="default" avartarProps={user} />;
}
