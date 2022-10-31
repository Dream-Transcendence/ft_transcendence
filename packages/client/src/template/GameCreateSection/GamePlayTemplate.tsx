import styled from '@emotion/styled';
import TextBox from '../../texts/TextBox';
import GamePlayWindowOrganism from '../../organisms/GamePlaySection/GamePlayWindow';
import { gameInfoPropsType } from '../../types/Game.type';
import { useEffect, useState } from 'react';
import { LADDER, NORMAL, POWERUP, SIZEDOWN } from '../../configs/Game.type';

const GameTemplateLayout = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  justifyContent: 'center',
  backgroundColor: '#194DD2',
  borderRadius: '10%',
  width: '80%',
  height: '90%',
  minHeight: '520px',
  minWidth: '500px',
}));

const GameHeaderLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '4%',
  marginTop: '-7%',
  marginBottom: '3%',
}));

const GameSectionLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  justifyItems: 'center',
  backgroundColor: '#435ff3',
  width: '100%',
  height: '73%',
}));

function GamePlayTemplate(props: { gameInfoProps: gameInfoPropsType }) {
  const gameInfoProps = props.gameInfoProps;
  const { value: gameInfo } = props.gameInfoProps;
  const [mode, setMode] = useState<string>('');
  useEffect(() => {
    switch (gameInfo?.mode) {
      case LADDER:
        setMode('Ladder 🎮');
        break;
      case NORMAL:
        setMode('1 VS 1 🤼');
        break;
      case POWERUP:
        setMode('1 VS 1 🏋️');
        break;
      case SIZEDOWN:
        setMode('1 VS 1 🧘‍♂️');
        break;
    }
  }, []);

  return (
    <GameTemplateLayout>
      <GameHeaderLayout>
        <TextBox value={`${mode}`} size={'2rem'} fontColor={'black'} />
      </GameHeaderLayout>
      <GameSectionLayout>
        <GamePlayWindowOrganism gameInfoProps={gameInfoProps} />
      </GameSectionLayout>
    </GameTemplateLayout>
  );
}

export default GamePlayTemplate;
