import styled from '@emotion/styled';
import UserStat from '../../organisms/ProfileUserStat/UserStat';
import FreindList from '../../organisms/ProfileFreindList/FreindList';
import UserInfo from '../../organisms/ProfileUserInfo/UserInfo';
import MatchHistory from '../../organisms/ProfileMatchHistory/MatchHistory';
import ReceiveMessageAlert from '../../molecules/CommonSection/ReceiveMessageAlert';
import SendMessageAlert from '../../molecules/CommonSection/SendMessageAlert';
import {
  Footer as Popup,
  ProfileLayout,
} from '../../pages/PageStyles/ProfilePageCss';
import OtherInfo from '../../organisms/ProfileUserInfo/OtherInfo';
import { BaseUserProfileData } from '../../types/Profile.type';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import { userDataAtom } from '../../recoil/user.recoil';

function ProfileTemplate() {
  const user = useRecoilValue<BaseUserProfileData>(userDataAtom);
  const { userId } = useParams();
  return (
    <ProfileLayout>
      {`${user.id}` === userId ? <UserInfo /> : <OtherInfo />}
      <FreindList />
      <UserStat />
      <MatchHistory />
      <Popup>{SendMessageAlert(`${user.id} === ${userId}`)}</Popup>
    </ProfileLayout>
  );
}

export default ProfileTemplate;
