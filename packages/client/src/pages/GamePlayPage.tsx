import styled from '@emotion/styled';
import NavigationBar from '../atoms/bar/NavigationBar';
import { gameNameSpace, GAMESTART } from '../socket/event';
import useSocket from '../socket/useSocket';
import GameCreateTemplate from '../template/GameCreateSection/GameCreateTemplate';
import GamePlayTemplate from '../template/GameCreateSection/GamePlayTemplate';
import { gameInfoPropsType } from '../types/Game.type';
import { useEffect } from 'react';

const GamePlayLayout = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#6BADE2',
  height: '100%',
  width: '100%',
  minHeight: '620px',
  minWidth: '800px',
}));

const GamePlayTemplateLayout = styled('section')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}));

const GameStartButton = styled('button')(({ theme }) => ({
  width: '20%',
  height: '20%',
  backgroundColor: 'red',
}));

function GamePlayPage(props: {gameInfoProps: gameInfoPropsType}) {
  const {value: gameInfo, setter: setGameInfo} = props.gameInfoProps;
  const [socket] = useSocket(gameNameSpace);
  console.log('?????');
  /* 버튼 누르는 버전*/

  // const gameStart = async () => {
  //   try {
  //     //await 걸어야함?
  //     setTimeout(() => {
  //       socket.emit(`${GAMESTART}`, {
  //         title: '',
  //       });
  //     }, 3000);
  //   } catch (error) {}
  // };
  // const handleGameStart = () => {
  //   gameStart();
  // };

  return (
    <GamePlayLayout>
      <GamePlayTemplateLayout>
        {/* <GameStartButton onClick={handleGameStart}> START </GameStartButton> */}
        {/* [SocketIO 요청] 게임구현 시, socket을 사용하겠지? */}
        <GamePlayTemplate />
      </GamePlayTemplateLayout>
    </GamePlayLayout>
  );
}

export default GamePlayPage;
