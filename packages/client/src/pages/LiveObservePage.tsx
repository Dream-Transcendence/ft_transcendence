import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {
  ListGenerateLayout,
  ListLayout,
  ListUlLayout,
} from '../atoms/list/styles/ListStylesCSS';
import { PROFILEURL } from '../configs/Link.url';
import LiveObserveElement from '../molecules/Observe/LiveObserveElement';
import { userDataAtom, userSecondAuth } from '../recoil/user.recoil';
import { gameNameSpace } from '../socket/event';
import useSocket from '../socket/useSocket';
import { GameRoomDto } from '../types/Game.type';
import { UserSecondAuth } from '../types/Profile.type';

const LiveObserveLayout = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  alignContent: 'center',
  backgroundColor: '#6BADE2',
  minHeight: '600px',
  height: '100%',
  width: '100%',
  minWidth: '1200px',
}));

const GameListLayout = styled('div')(({ theme }) => ({
  height: '100%',
  width: '80%',
  marginTop: '1%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  alignContent: 'center',
}));

const NoGameLayout = styled('div')(({ theme }) => ({
  height: '88vh',
  width: '100vh',
}));

function LiveObservePage() {
  const [socket, connect, disconnect] = useSocket(gameNameSpace);
  const userData = useRecoilValue(userDataAtom);
  const passSecondOauth = useRecoilValue<UserSecondAuth>(userSecondAuth);
  const [gameInfos, setGameInfos] = useState<GameRoomDto[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    //정상적인 접근인지 판단하는 로직
    if (userData.id === 0 || passSecondOauth.checkIsValid === false)
      navigate('/');
  }, [userData.id, passSecondOauth, navigate]);

  useEffect(() => {
    //정상적인 접근인지 판단하는 로직
    const getLiveGames = async () => {
      await axios
        .get(`${process.env.REACT_APP_SERVER_URL}/game/live-games`)
        .then((res: any) => {
          console.log(res.data);
          setGameInfos([...res.data]);
        })
        .catch((error) => {
          console.log(error);
          navigate(PROFILEURL);
        });
    };
    getLiveGames();
  }, []);

  useEffect(() => {
    if (socket.connected === false) connect();
  }, []);

  const listElement: React.ReactElement[] = gameInfos.map(
    (game: GameRoomDto, index: number) => {
      return (
        <ListLayout key={index}>
          <LiveObserveElement gameInfo={game} />
        </ListLayout>
      );
    },
  );

  return (
    <LiveObserveLayout>
      <GameListLayout>
        {gameInfos.length === 0 ? (
          <NoGameLayout>
            <Typography
              whiteSpace={'normal'}
              paddingTop={'22vh'}
              paddingLeft={'30vh'}
              color={'white'}
              fontSize={'10vh'}
              style={{
                wordWrap: 'break-word',
                marginRight: '-20vh',
              }}
            >
              NO GAME
            </Typography>
            <Typography
              whiteSpace={'normal'}
              paddingTop={'3vh'}
              paddingLeft={'43vh'}
              color={'white'}
              fontSize={'20vh'}
              style={{
                wordWrap: 'break-word',
              }}
            >
              😭
            </Typography>
          </NoGameLayout>
        ) : (
          <ListGenerateLayout>
            <ListUlLayout>{listElement}</ListUlLayout>
          </ListGenerateLayout>
        )}
      </GameListLayout>
    </LiveObserveLayout>
  );
}

export default LiveObservePage;
