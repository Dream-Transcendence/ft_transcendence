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

  //[수정사항] gameloading으로 넘어가야함
  const EnterRoom: LinkTextResource = {
    content: 'INVITE',
  };

  return (
    <GameTemplateLayout>
      {/* [axios GET 요청] 상대방이 게임중인지 확인할 수 있는 정보 불러오기 및 POST요청 시 확인해도 가능 */}
      <GameHeaderLayout>
        <TextBox value={'Enjoy Game!'} size={'3rem'} fontColor={'black'} />
      </GameHeaderLayout>
      <GameSectionLayout>
        <GameCreateMainOrganism />
      </GameSectionLayout>
      <GameFooterLayout>
        {/* [axios POST 요청] 상대방이 게임중인지 확인할 수 있는 정보 불러오기 및 각종 옵션을 포함한 정보를 전달하여 게임방 생성 */}
        {/* [SocketIO 요청] 상대방 초대 
        소켓 연결해아함?? 좀 더 공부해야함 */}
        {/* 상대방 화면에 수락 컴포넌트 요청할 것임. */}
        <ButtonComponentLayout LinkTextResource={EnterRoom} />
      </GameFooterLayout>
    </GameTemplateLayout>
  );
}

export default GameCreateTemplate;
