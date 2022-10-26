import styled from '@emotion/styled';
import TextBox from '../texts/TextBox';
import { LinkTextResource } from '../types/Link.type';
import HistoryBackTextButton from '../atoms/button/linkPage/HistoryBackTextButton';
import { useNavigate } from 'react-router-dom';
import useSocket from '../socket/useSocket';
import { ALREADFORMATCH, GAMECANCLE, gameLadderMatch, gameNameSpace } from '../socket/event';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { GAMEPLAYURL } from '../configs/Link.url';
import { gameInfoPropsType, GameRoomDto } from '../types/Game.type';
import { gameTypeAtom } from '../recoil/user.recoil';
import { userDataAtom } from '../recoil/user.recoil';
import { LADDER, CUSTOM } from '../configs/Game.type';

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

//위치 확인후 게임 입장
const moveToGame = (args: GameRoomDto, userId: number) => {};

function GameLoadingPage(props: {gameInfoProps: gameInfoPropsType}) {
  const {value: gameInfo, setter: setGameInfo} = props.gameInfoProps;
  const [socket] = useSocket(gameNameSpace);
  const { id: userId } = useRecoilValue(userDataAtom);
  const gameType = useRecoilValue(gameTypeAtom);
  useEffect(() => {
    // connect(); //game namespace socket 연결
    //ladder 일때
    console.log('gametype: ', gameType);
    if (gameType === LADDER) {
      console.log('before emit');
      socket.emit(
        `${gameLadderMatch}`,
        {
          userId: userId,
          mode: 0,
        },
        (response: any) => {
          console.log('match emit 성공 : ', response);
        },
      );
    } else if (gameType === CUSTOM) {
      //1:1일때
      socket.emit(
        `${gameLadderMatch}`,
        {
          userId: userId,
          mode: 0,
        },
        (response: any) => {
          console.log('match emit 성공 : ', response);
        },
      );
    }
    return () => {
      socket.emit(`${GAMECANCLE}`,
      {
        useId: userId,
        onGame: false,
      })
      console.log('match cancel!');
      socket.removeAllListeners(); //모든 리스너 제거
    }
  }, []);

    //match 성공시 값 받아서 동작시켜야함
    useEffect(() => {
      socket.on(ALREADFORMATCH, (response: GameRoomDto) => {
        setGameInfo(response);
      });
      return () => {
        socket.off(ALREADFORMATCH);
      }
    }, [])

    //게임 취소 로직 이어 구현하기
    // socket.on(`${gameCancel}`)
    //GameRoomDto로 수정 예정
    socket.on('exception', (response: any) => {
      alert(response.message);
      console.log(response);
    });
    console.log('?');

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
