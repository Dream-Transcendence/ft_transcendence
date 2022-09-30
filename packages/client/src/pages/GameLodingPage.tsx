import styled from '@emotion/styled';
import TextBox from '../texts/TextBox';
import { LinkTextResource } from '../types/Link.type';
import HistoryBackTextButton from '../atoms/button/linkPage/HistoryBackTextButton';
import { useNavigate } from 'react-router-dom';

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

const Goback = () => {
  const navigate = useNavigate();
  navigate(-1);
  return <div></div>;
};

function GameLodingPage() {
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

export default GameLodingPage;
