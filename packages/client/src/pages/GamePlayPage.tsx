import styled from '@emotion/styled';
import NavigationBar from '../components/bar/NavigationBar';
import GameCreateTemplate from '../template/GameCreateSection/GameCreateTemplate';
import GamePlayTemplate from '../template/GameCreateSection/GamePlayTemplate';

const GamePlayLayout = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#6BADE2',
  height: '100%',
  width: '100%',
}));

const NavGridLayout = styled('section')(({ theme }) => ({
  width: '100%',
  height: '10%',
}));

const GamePlayTemplateLayout = styled('section')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '90%',
  alignItems: 'center',
  justifyContent: 'center', //justifySelf: 'center'는 왜 안될까..
}));

function GamePlayPage() {
  return (
    <GamePlayLayout>
      <NavGridLayout>
        <NavigationBar></NavigationBar>
      </NavGridLayout>
      <GamePlayTemplateLayout>
        <GamePlayTemplate />
      </GamePlayTemplateLayout>
    </GamePlayLayout>
  );
}

export default GamePlayPage;
