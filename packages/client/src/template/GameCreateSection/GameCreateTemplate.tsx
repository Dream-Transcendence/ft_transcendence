import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import TextBox from '../../texts/TextBox';
import GameCreateMainOrganism from '../../organisms/GameCreateSection/GameCreateMainSection';
import LinkPageTextButton from '../../atoms/button/linkPage/LinkPageTextButton';
import { LinkComponentResource, LinkTextResource } from '../../types/Link.type';
import LinkPageComponentButton from '../../atoms/button/linkPage/LinkPageComponentButton';
import { Typography } from '@mui/material';
import { GAMECREATEURL, GAMELOADINGURL } from '../../configs/Link.url';
import { CUSTOM } from '../../configs/Game.type';
import { useRecoilState, useRecoilValue } from 'recoil';
import { gameTypeAtom, userDataAtom } from '../../recoil/user.recoil';
import useSocket from '../../socket/useSocket';
import { GAMEINVITE, gameNameSpace } from '../../socket/event';
import { useEffect } from 'react';
import { BaseUserProfileData } from '../../types/Profile.type';
import { gameModeAtom, gameOpponetAtom } from '../../recoil/game.recoil';

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

const ButtonComponentLayout = styled('div')(({ theme }) => ({
  backgroundColor: '#312ECE',
}));

function GameCreateTemplate() {
  const userData = useRecoilValue<BaseUserProfileData>(userDataAtom);
  const opponentId = useRecoilValue<number>(gameOpponetAtom);
  const [userGameType, setUserGameType] = useRecoilState(gameTypeAtom);
  const gameMode = useRecoilValue<number>(gameModeAtom);
  const [socket] = useSocket(gameNameSpace);

  const setNomal = () => {
    setUserGameType(CUSTOM);
  };

  useEffect(() => {
    socket.emit(GAMEINVITE, {
      hostId: userData.id,
      opponentId: opponentId,
      mode: gameMode, // 게임 모드(1 normal, 2 speed up, 3 size up)
    });
  }, [userGameType]); //, gameMode, opponentId, userData.id, socket

  //[수정사항] gameloading으로 넘어가야함
  const EnterGame: LinkComponentResource = {
    url: GAMELOADINGURL,
    component: <Button onClick={setNomal}>Invite</Button>,
  };

  return (
    <GameTemplateLayout>
      {/* [axios GET 요청] 상대방이 게임중인지 확인할 수 있는 정보 불러오기 및 POST요청 시 확인해도 가능 */}
      <GameHeaderLayout>
        <TextBox value={'Enjoy Game!'} size={'3rem'} fontColor={'black'} />
      </GameHeaderLayout>
      <GameSectionLayout>
        {/* mpa, option */}
        <GameCreateMainOrganism />
      </GameSectionLayout>
      <GameFooterLayout>
        <ButtonComponentLayout>
          <LinkPageComponentButton linkComponentprops={EnterGame} />
        </ButtonComponentLayout>
      </GameFooterLayout>
    </GameTemplateLayout>
  );
}

export default GameCreateTemplate;
