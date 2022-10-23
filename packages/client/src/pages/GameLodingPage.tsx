import styled from '@emotion/styled';
import TextBox from '../texts/TextBox';
import { LinkTextResource } from '../types/Link.type';
import HistoryBackTextButton from '../atoms/button/linkPage/HistoryBackTextButton';
import { useNavigate } from 'react-router-dom';
import useSocket from '../socket/useSocket';
import { gameLadderMatch, gameNameSpace } from '../socket/event';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { GAMEPLAYURL } from '../configs/Link.url';
import { GameRoomDto } from '../types/Game.type';
import { userGameTypeAtom } from '../recoil/uesr.recoil';
import { userDataAtom } from '../recoil/user.recoil';

const GameLodingLayout = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#194DD2',
  height: '100%',
  width: '100%',
}));

const LodingImageLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100%',
  height: '80%',
}));

const BottomLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'end',
  width: '100%',
  height: '3.5%',
}));

const ButtonLayout = styled('div')(({ theme }) => ({
  backgroundColor: '#0E359B',
}));

// const goback = () => {
//   const navigate = useNavigate();
//   navigate(-1);
//   return <div></div>;
// };

// 사용자가 어느쪽 플레이어인지 확인
function findPlayerSpot(args: GameRoomDto, userId: number) {
  if (args.leftPlayer.id === userId) {
    return 'left';
  } else {
    return 'right';
  }
}

//위치 확인후 게임 입장
const moveToGame = (args: GameRoomDto, userId: number) => {
  findPlayerSpot(args, userId);
};

function GameLoadingPage() {
  const navigate = useNavigate();
  const { id: userId } = useRecoilValue(userDataAtom);
  const [socket, connect, disconnect] = useSocket(gameNameSpace);
  const userState = useRecoilValue(userGameTypeAtom);
  useEffect(() => {
    connect(); //game namespace socket 연결
    //ladder 일때
    socket.emit(
      `${gameLadderMatch}`,
      {
        userId: userId,
      },
      (response: any) => {
        console.log('emit 성공 : ', response);
      },
    );
    //1:1일때
    //socket.emit~~~

    //match 성공시 값 받아서 동작시켜야함
    socket.on(`${gameLadderMatch}`, (args) => {
      moveToGame(args, userId);
      navigate(`${GAMEPLAYURL}/${userId}`);
    });
    //GameRoomDto로 수정 예정
    socket.on('exception', (response: any) => {
      alert(response.message);
      console.log(response);
    });
    return () => {
      //unmount
      socket.removeAllListeners(); //모든 리스너 제거
      disconnect();
    };
  });
  return (
    <GameLodingLayout>
      {/* [axios GET 요청] 게임 큐 체크? */}
      {/* [axios POST 요청] 매칭 성공 시, 게임 방 생성요청 */}
      {/* [SocketIO 요청] 게임 큐 체크? */}
      <LodingImageLayout>
        <TextBox
          value={'상대방을 기다리는 중입니다.'}
          size={'3rem'}
          fontColor={'white'}
        ></TextBox>
        <TextBox value={'🏓'} size={'30rem'} fontColor={'white'}></TextBox>
      </LodingImageLayout>
      <BottomLayout>
        <ButtonLayout>
          {/*배경색 주기 위함*/}
          <HistoryBackTextButton />
        </ButtonLayout>
      </BottomLayout>
    </GameLodingLayout>
  );
}

export default GameLoadingPage;
