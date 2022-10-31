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
      <Typography style={{ fontSize: '400px' }}> 404 </Typography>
    </MainSection>
  );
}

export default NotFoundPage;
