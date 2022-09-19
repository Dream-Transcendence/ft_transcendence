import styled from '@emotion/styled';
import NavigationBar from '../components/bar/NavigationBar';
import ProfileTemplate from '../template/ProfileSection/ProfileTemplate';

const GameLayout = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#6BADE2',
  height: '100%',
  width: '100%',
}));

const NavGridLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '10%',
}));

function GamePage() {
  return (
    <GameLayout>
      <NavGridLayout>
        <NavigationBar></NavigationBar>
      </NavGridLayout>
    </GameLayout>
  );
}

export default GamePage;
