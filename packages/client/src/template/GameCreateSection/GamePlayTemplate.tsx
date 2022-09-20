import styled from '@emotion/styled';
import TextBox from '../../atoms/TextBox';
import GameCreateMainOrganism from '../../organisms/GameCreateSection/GameCreateMainSection';
import GamePlayWindowOrganism from '../../organisms/GamePlaySection/GamePlayWindow';

const GameTemplateLayout = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  backgroundColor: '#194DD2',
  width: '80%',
  height: '85%',
}));

const GameHeaderLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '10%',
}));

const GameSectionLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '90%',
}));

function GamePlayTemplate() {
  return (
    <GameTemplateLayout>
      <GameHeaderLayout>
        <TextBox value={'Ladder'} size={'2rem'} fontColor={'black'} />
      </GameHeaderLayout>
      <GameSectionLayout>
        <GamePlayWindowOrganism />
      </GameSectionLayout>
    </GameTemplateLayout>
  );
}

export default GamePlayTemplate;
