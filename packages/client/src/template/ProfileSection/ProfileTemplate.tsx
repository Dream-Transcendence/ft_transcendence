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
import { Navigate, Routes, useParams } from 'react-router-dom';
import { Route } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { SERVERURL } from '../../configs/Link.url';
import LandingPage from '../../pages/LandingPage';
import { reqUserDataAtom, userDataAtom } from '../../pages/PingpongRoutePage';

function ProfileTemplate() {
  const user = useRecoilValue<BaseUserProfileData>(userDataAtom);
  const { userId } = useParams();

  return (
    <ProfileLayout>
      <Routes>
        {`${user.id}` === userId ? (
          <Route path={`${user.id}`} element={<UserInfo />} />
        ) : (
          <Route path={`${userId}`} element={<OtherInfo />} />
        )}
      </Routes>
      <FreindList />
      <UserStat />
      <MatchHistory />
      <Popup>{SendMessageAlert(`${user.id} === ${userId}`)}</Popup>
    </ProfileLayout>
  );
}

export default ProfileTemplate;
