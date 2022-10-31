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
import { GAMEINVITE, gameNameSpace, userNameSpace } from '../../socket/event';
import { useEffect } from 'react';
import { BaseUserProfileData } from '../../types/Profile.type';
import { gameInviteInfoAtom } from '../../recoil/game.recoil';
import { useNavigate } from 'react-router-dom';
import { GameInviteInfoType } from '../../types/Game.type';

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
  overflow: 'hidden',
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

const InviteButton = styled.button`
  background: #0288d1;
  border-radius: 15px;
  width: 20vw;
  minwidth: 15vw;
  height: 5vh;
  border: none;
  overflow: hidden;
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: bold;
  &:hover {
    background: #33fdf0;
  }
  &:active {
    background: #2d6;
  }
`;

function GameCreateTemplate() {
  const userData = useRecoilValue<BaseUserProfileData>(userDataAtom);
  const [gameInviteInfo, setGameInviteInfo] =
    useRecoilState<GameInviteInfoType>(gameInviteInfoAtom);
  const [userGameType, setUserGameType] = useRecoilState(gameTypeAtom);
  const [gameSocket] = useSocket(gameNameSpace);
  const [userSocket] = useSocket(userNameSpace);
  const navigate = useNavigate();

  //game invite
  const gameRequest = () => {
    userSocket.emit(GAMEINVITE, {
      hostId: userData.id,
      opponentId: gameInviteInfo.opponentId,
      mode: gameInviteInfo.mode, // 게임 모드(1 normal, 2 speed up, 3 size up)
    });
  };

  const setNomal = () => {
    setUserGameType(CUSTOM);
    gameRequest();
    navigate(GAMELOADINGURL);
  };

  //[수정사항] gameloading으로 넘어가야함
  const EnterGame: LinkComponentResource = {
    url: GAMELOADINGURL,
    component: <InviteButton onClick={setNomal}>초대하기</InviteButton>,
  };

  useEffect(() => {
    gameSocket.on('exeption', (response) => {
      alert('상대방이 로그오프 상태입니다.');
      console.log(response);
    });
  });

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
        <LinkPageComponentButton linkComponentprops={EnterGame} />
      </GameFooterLayout>
    </GameTemplateLayout>
  );
}

export default GameCreateTemplate;
