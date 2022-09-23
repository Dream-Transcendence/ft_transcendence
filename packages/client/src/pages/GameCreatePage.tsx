import styled from '@emotion/styled';
import NavigationBar from '../atoms/bar/NavigationBar';
import GameCreateTemplate from '../template/GameCreateSection/GameCreateTemplate';

const GameCreateLayout = styled('section')(({ theme }) => ({
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

const GameCreateTemplateLayout = styled('section')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '90%',
  alignItems: 'center',
  justifyContent: 'center', //justifySelf: 'center'는 왜 안될까..
}));

function GameCreatePage() {
  return (
    <GameCreateLayout>
      <NavGridLayout>
        <NavigationBar></NavigationBar>
      </NavGridLayout>
      <GameCreateTemplateLayout>
        <GameCreateTemplate buttonType={'invite'} />
      </GameCreateTemplateLayout>
    </GameCreateLayout>
  );
}

export default GameCreatePage;
