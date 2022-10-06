import styled from '@emotion/styled';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import NavigationBar from '../atoms/bar/NavigationBar';
import LinkPageComponentButton from '../atoms/button/linkPage/LinkPageComponentButton';
import { PROFILEURL } from '../configs/Link.url';
import { LinkComponentResource } from '../types/Link.type';
import { userDataAtom } from './PingpongRoutePage';

const MainSection = styled.section`
  background: #6bade2;
  width: 1fr;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EnterButton = styled.button`
  background: #0288d1;
  border-radius: 15px;
  width: 20vw;
  height: 10vh;
  border: none;
  color: #ffffff;
  font-size: 30px;
  font-weight: bold;
  &:hover {
    background: #33fdf0;
  }
  &:active {
    background: #2d6;
  }
`;

function LandingPage() {
  const [user, setUser] = useRecoilState(userDataAtom);

  const Enter: LinkComponentResource = {
    url: PROFILEURL,
    // [axios GET 요청] 서버 측으로 로그인시도 전달
    component: <EnterButton>들어가기</EnterButton>,
  };
  return (
    <MainSection>
      <LinkPageComponentButton LinkComponentprops={Enter} />
    </MainSection>
  );
}

export default LandingPage;
