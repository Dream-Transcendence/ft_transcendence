import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import TextBox from '../../texts/TextBox';
import GameCreateMainOrganism from '../../organisms/GameCreateSection/GameCreateMainSection';
import LinkPageTextButton from '../../atoms/button/linkPage/LinkPageTextButton';
import { LinkTextResource } from '../../types/Link.type';

const GameTemplateLayout = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  backgroundColor: '#194DD2',
  width: '80%',
  height: '85%',
  gridAutoColumns: '1fr 1fr',
  gridAutoRows: '20%',
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
  height: '70%',
}));

const GameFooterLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '20%',
}));

const ButtonComponentLayout = styled(LinkPageTextButton)(({ theme }) => ({
  backgroundColor: '#312ECE',
}));

function GameCreateTemplate(props: { buttonType: string | undefined }) {
  const { buttonType } = props;

  const EnterRoom: LinkTextResource = {
    url: '/pingpong/gameloding',
    content: 'INVITE',
  };

  return (
    <GameTemplateLayout>
      <GameHeaderLayout>
        <TextBox value={'Enjoy Game!'} size={'3rem'} fontColor={'black'} />
      </GameHeaderLayout>
      <GameSectionLayout>
        <GameCreateMainOrganism />
      </GameSectionLayout>
      <GameFooterLayout>
        <ButtonComponentLayout LinkTextResource={EnterRoom} />
      </GameFooterLayout>
    </GameTemplateLayout>
  );
}

export default GameCreateTemplate;
