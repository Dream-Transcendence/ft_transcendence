import styled from '@emotion/styled';
import { useState } from 'react';
import NavigationBar from '../atoms/bar/NavigationBar';
import LinkPageComponentButton from '../atoms/button/linkPage/LinkPageComponentButton';
import { PROFILEURL } from '../configs/Link.url';
import { LinkComponentResource } from '../types/Link.type';

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
  const Enter: LinkComponentResource = {
    url: PROFILEURL,
    component: <EnterButton>들어가기</EnterButton>
    ,
  };
  return (
    <MainSection>
      <LinkPageComponentButton LinkComponentResource={Enter} />
    </MainSection>
  );
}

export default LandingPage;
