import styled from '@emotion/styled';
import TextBox from '../../texts/TextBox';
import GamePlayWindowOrganism from '../../organisms/GamePlaySection/GamePlayWindow';

const GameTemplateLayout = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  backgroundColor: '#194DD2',
  borderRadius: '10%',
  width: '80%',
  height: '60%',
}));

const GameHeaderLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '10%',
}));

const GameSectionLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  justifyItems: 'center',
  backgroundColor: '#435ff3',
  width: '100%',
  height: '80%',
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
