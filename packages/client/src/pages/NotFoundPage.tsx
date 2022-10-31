import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const MainSection = styled.section`
  background: #6bade2;
  width: 1fr;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function NotFoundPage() {
  return (
    <MainSection>
      <Typography
        sx={{
          fontSize: '30vh',
          top: '20%',
          fontSizeAdjust: 'from-font',
          position: 'absolute',
        }}
      >
        404
      </Typography>
      <Typography
        sx={{
          fontSize: '5vh',
          top: '60%',
          fontSizeAdjust: 'from-font',
          position: 'absolute',
        }}
      >
        페이지를 찾을 수 없습니다.
      </Typography>
    </MainSection>
  );
}

export default NotFoundPage;
