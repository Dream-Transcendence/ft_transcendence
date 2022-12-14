import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { GAMEPLAYURL } from '../../configs/Link.url';
import { gameInfoAtom } from '../../recoil/game.recoil';
import { gameNameSpace, WATCH } from '../../socket/event';
import LinkPageTextButton from '../../atoms/button/linkPage/LinkPageTextButton';
import useSocket from '../../socket/useSocket';
import { GameRoomDto } from '../../types/Game.type';
import { LinkTextResource } from '../../types/Link.type';
import { useEffect, useState } from 'react';
import { CUSTOM, LADDER, SIZEDOWN, SPEEDUP } from '../../configs/Game.type';

const LiveObserveElementLayout = styled('div')(({ theme }) => ({
  width: '98%',
  height: '100%',
  marginBottom: '1%',
  borderRadius: '3rem',
  backgroundColor: '#1976D2',
  boxShadow: '2px 2px 2px 1px #03008855',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const LeftPlayerLayout = styled('div')(({ theme }) => ({
  width: '45%',
  height: '100%',
  // backgroundColor: '#197112',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  borderRadius: '3rem 0 0 3rem',
  paddingLeft: '1%',
}));

const VerseLayout = styled('div')(({ theme }) => ({
  width: '10%',
  height: '100%',
  // backgroundColor: '#19ff12',
  padding: '2%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
}));

const RightPlayerLayout = styled('div')(({ theme }) => ({
  width: '45%',
  height: '100%',
  // backgroundColor: '#ff7112',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  borderRadius: '0 3rem 3rem 0',
  paddingRight: '1%',
}));

const LeftPlayerImageLayout = styled('img')(({ theme }) => ({
  width: '20%',
  height: '50%',
  borderRadius: '2rem 2rem 2rem 2rem',
  paddingRight: '2%',
}));

const LeftPlayerNameLayout = styled('div')(({ theme }) => ({
  width: '80%',
  height: '50%',
  borderRadius: '2rem 2rem 2rem 2rem',
  backgroundColor: 'whitesmoke',
}));

const RightPlayerImageLayout = styled('img')(({ theme }) => ({
  width: '20%',
  height: '50%',
  marginLeft: '-50%',
  borderRadius: '2rem 2rem 2rem 2rem',
  paddingRight: '2%',
}));

const RightPlayerNameLayout = styled('div')(({ theme }) => ({
  width: '80%',
  height: '50%',
  borderRadius: '2rem 2rem 2rem 2rem',
  backgroundColor: 'whitesmoke',
}));

const ObserveEnterButtonLayout = styled('div')(({ theme }) => ({
  width: '80px',
  height: '40px',
  zIndex: '3',
}));

const ModeLayout = styled('div')(({ theme }) => ({
  width: '80px',
  height: '10px',
}));

function LiveObserveElement(props: { gameInfo: GameRoomDto }) {
  const gameInfo = props.gameInfo;
  const setGameInfo = useSetRecoilState(gameInfoAtom);
  const navigate = useNavigate();
  const [socket, connect, disconnect] = useSocket(gameNameSpace);
  const [mode, setMode] = useState<string>('');

  function handlerObserver() {
    socket.emit(
      WATCH,
      {
        userId: gameInfo.leftPlayer.id,
      },
      (res: GameRoomDto) => {
        setGameInfo(res);
        navigate(`${GAMEPLAYURL}/${res.title}`);
      },
    );
  }

  useEffect(() => {
    socket.on('exception', (error) => {
      alert(error.message);
    });
    return () => {
      socket.off('exception');
    };
  }, []);

  useEffect(() => {
    switch (gameInfo?.mode) {
      case LADDER:
        setMode('Ladder ????');
        break;
      case CUSTOM:
        setMode('1 VS 1 ????');
        break;
      case SPEEDUP:
        setMode('1 VS 1 ????');
        break;
      case SIZEDOWN:
        setMode('1 VS 1 ????');
        break;
    }
  }, []);

  const EnterRoom: LinkTextResource = {
    //???????????? ?????? ?????? url
    content: '??????',
    handler: handlerObserver,
    style: {
      background: 'linear-gradient(to bottom right, #f796c0, #76aef1)',
      fontFamily: 'Lato, sans-serif',
      fontWeight: 500,
      marginTop: '-10%',
      borderRadius: '5px',
      boxShadow: '0 5px 7px #00000022',
      padding: '10px 7px',
      fontSize: '13px',
      border: 'none',
      color: 'whitesmoke',
      transition: '0.25s',
      '&:hover': {
        letterSpacing: '1px',
        transform: [{ scale: 5 }], //??? ???????????????
        cursor: 'pointer',
      },
    },
  };

  return (
    <LiveObserveElementLayout>
      <LeftPlayerLayout>
        <LeftPlayerImageLayout
          src={gameInfo.leftPlayer.image}
          alt="leftPlayer"
        ></LeftPlayerImageLayout>
        <LeftPlayerNameLayout>
          <Typography
            whiteSpace={'normal'}
            padding={'8%'}
            color={'#ff452aaa'}
            fontSize={'3vh'}
            style={{
              wordWrap: 'break-word',
              paddingLeft: '10%',
              paddingTop: '10%',
              marginRight: '-20%',
            }}
          >
            {gameInfo.leftPlayer.nickname}
          </Typography>
        </LeftPlayerNameLayout>
      </LeftPlayerLayout>
      <VerseLayout>
        <ModeLayout>
          <Typography
            whiteSpace={'normal'}
            paddingLeft={'20%'}
            paddingTop={'10%'}
            color={'#aaffcc'}
            fontSize={'1vh'}
            style={{
              wordWrap: 'break-word',
            }}
          >
            {mode}
          </Typography>
        </ModeLayout>
        <Typography
          whiteSpace={'normal'}
          padding={'8%'}
          paddingBottom={'10%'}
          color={'white'}
          fontSize={'7vh'}
          style={{
            wordWrap: 'break-word',
          }}
        >
          vs
        </Typography>
      </VerseLayout>
      <RightPlayerLayout>
        <RightPlayerImageLayout
          src={gameInfo.rightPlayer.image}
          alt="rightPlayer"
        ></RightPlayerImageLayout>
        <RightPlayerNameLayout>
          <Typography
            whiteSpace={'normal'}
            padding={'8%'}
            color={'#2a45ffaa'}
            fontSize={'3vh'}
            style={{
              wordWrap: 'break-word',
              paddingTop: '10%',
              paddingLeft: '10%',
              marginRight: '-20%',
            }}
          >
            {gameInfo.rightPlayer.nickname}
          </Typography>
        </RightPlayerNameLayout>
      </RightPlayerLayout>
      <ObserveEnterButtonLayout>
        <LinkPageTextButton LinkTextResource={EnterRoom} />
      </ObserveEnterButtonLayout>
    </LiveObserveElementLayout>
  );
}

export default LiveObserveElement;
