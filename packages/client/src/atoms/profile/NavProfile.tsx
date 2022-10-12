import { Avatar } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { userDataAtom } from '../../pages/PingpongRoutePage';
import { BaseUserProfileData } from '../../types/Profile.type';
import { ProfileAvatarLayout } from './AvartarStyles/AvartarStyleCss';
import ProfileAvatar from './ProfileAvatar';

export default function NavProfile() {
  const user = useRecoilValue<BaseUserProfileData>(userDataAtom);

  return (
    <ProfileAvatarLayout>
      <Avatar alt={user.nickname} src={user.image} />
    </ProfileAvatarLayout>);
}
