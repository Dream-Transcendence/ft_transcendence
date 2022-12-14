import styled from '@emotion/styled';
import TextBox from '../../texts/TextBox';
import GameCreateMainOrganism from '../../organisms/GameCreateSection/GameCreateMainSection';
import { GAMELOADINGURL } from '../../configs/Link.url';
import { useRecoilValue } from 'recoil';
import { gameTypeAtom } from '../../recoil/user.recoil';
import useSocket from '../../socket/useSocket';
import { GAMEINVITE, gameNameSpace, userNameSpace } from '../../socket/event';
import { useEffect } from 'react';
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
  const gameInviteInfo = useRecoilValue<GameInviteInfoType>(gameInviteInfoAtom);
  const gameType = useRecoilValue(gameTypeAtom);
  const [gameSocket] = useSocket(gameNameSpace);
  const [userSocket] = useSocket(userNameSpace);
  const navigate = useNavigate();

  //game invite
  const gameRequest = () => {
    userSocket.emit(GAMEINVITE, {
      hostId: gameInviteInfo.hostId,
      opponentId: gameInviteInfo.opponentId,
      mode: gameInviteInfo.mode, // ?????? ??????(1 normal, 2 speed up, 3 size up)
    });
    navigate(GAMELOADINGURL);
  };

  const setNomal = () => {
    gameRequest();
  };

  useEffect(() => {
    gameSocket.on('exeption', (response) => {
      alert('???????????? ???????????? ???????????????.');
    });
  });

  return (
    <GameTemplateLayout>
      <GameHeaderLayout>
        <TextBox value={'Enjoy Game!'} size={'3rem'} fontColor={'black'} />
      </GameHeaderLayout>
      <GameSectionLayout>
        <GameCreateMainOrganism />
      </GameSectionLayout>
      <GameFooterLayout>
        <InviteButton onClick={setNomal}>????????????</InviteButton>
      </GameFooterLayout>
    </GameTemplateLayout>
  );
}

export default GameCreateTemplate;
