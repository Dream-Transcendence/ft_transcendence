import styled from '@emotion/styled';
import GamePlayTemplate from '../template/GameCreateSection/GamePlayTemplate';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userDataAtom, userSecondAuth } from '../recoil/user.recoil';
import { useNavigate } from 'react-router-dom';
import { UserSecondAuth } from '../types/Profile.type';
import { gameInfoAtom } from '../recoil/game.recoil';
import { PROFILEURL } from '../configs/Link.url';
import axios from 'axios';

const GamePlayLayout = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#6BADE2',
  height: '100%',
  width: '100%',
  minHeight: '800px',
  minWidth: '1200px',
}));

const GamePlayTemplateLayout = styled('section')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}));

function GamePlayPage() {
  const userData = useRecoilValue(userDataAtom);
  const navigate = useNavigate();
  const passSecondOauth = useRecoilValue<UserSecondAuth>(userSecondAuth);
  const gameInfo = useRecoilValue(gameInfoAtom);

  useEffect(() => {
    //정상적인 접근인지 판단하는 로직

    if (userData.id === 0 || passSecondOauth.checkIsValid === false)
      navigate('/');
    else if (gameInfo === undefined) navigate(PROFILEURL);
  }, [userData.id, passSecondOauth, navigate]);

  useEffect(() => {
    const checkIsValidGame = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/game/rooms/${gameInfo?.title}`,
      );
      if (!response.data.isExist) {
        return navigate(PROFILEURL);
      }
    };
    //정상적인 접근인지 판단하는 로직
    if (gameInfo !== undefined) checkIsValidGame();
  }, [gameInfo, navigate]);

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
