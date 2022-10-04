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
import { selector, useRecoilState, useRecoilValue } from 'recoil';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import axios from 'axios';

const otherData = selector<BaseUserProfileData>({
  key: 'otherData',
  get: async ({ get }) => {
    const respones = await axios.get('/others');
    console.log("others: ", respones);
    return respones.data;
  }
})

function ProfileTemplate() {
  // const userId = useRecoilValue<BaseUserProfileData>(userData);
  // const otherId = useRecoilValue<BaseUserProfileData>(otherData);
  /**
   * if (userId === otherId) {
   *  
   * }
   */
  const userId = 'user';
  const otherId = 'user';
  return (
    <ProfileLayout>
      <Routes>
        {/* <Route path={`${userId.userNickname}`} element={<UserInfo />} />
        <Route path={`${otherId.userNickname}`} element={<OtherInfo />} /> */}
        {userId === otherId ? //기본 리다이렉션 경경로또한 /user -> /123456
          <Route path={'user'} element={<UserInfo />} />
          : <Route path={'user'} element={<OtherInfo />} />}
      </Routes>
      <FreindList />
      <UserStat />
      <MatchHistory />
      <Popup>{SendMessageAlert('친구')}</Popup>
    </ProfileLayout>
  );
}

export default ProfileTemplate;
