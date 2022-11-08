import styled from '@emotion/styled';
import axios from 'axios';

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

console.log(window.location.origin);

axios.defaults.withCredentials = true;

function LandingPage() {
  const loginOauth = () => {
    //[수정사항] 이미 로그인 중인지도 파악하는 로직 추가예정
    window.location.href = `${process.env.REACT_APP_SERVER_URL}/auth/login`;
  };

  return (
    <MainSection>
      <EnterButton onClick={loginOauth}>들어가기</EnterButton>
      {/* <LinkPageComponentButton LinkComponentprops={Enter} /> */}
    </MainSection>
  );
}

export default LandingPage;
