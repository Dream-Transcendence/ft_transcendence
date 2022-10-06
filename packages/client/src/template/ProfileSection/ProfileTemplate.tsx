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
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { Navigate, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import axios from 'axios';
import { reqUserAtom, userAtom } from '../../pages/PingpongRoutePage';
import { useEffect } from 'react';
import { SERVERURL } from '../../configs/Link.url';
import LandingPage from '../../pages/LandingPage';

function ProfileTemplate() {
  const user = useRecoilValue<BaseUserProfileData>(userAtom);
  const reqUser = useRecoilValue<BaseUserProfileData>(reqUserAtom);

  return (
    <ProfileLayout>
      <Routes>
        {user.nickname === reqUser.nickname ? (
          <Route path={`user`} element={<UserInfo />} />
        ) : (
          <Route path={`${reqUser.nickname}`} element={<OtherInfo />} />
        )}
      </Routes>
      <FreindList />
      <UserStat />
      <MatchHistory />
      <Popup>{SendMessageAlert(`${user.nickname === reqUser.nickname}`)}</Popup>
    </ProfileLayout>
  );
}

export default ProfileTemplate;
