import styled from '@emotion/styled';
import GameOption from '../../molecules/GameSecton/GameOption';

const GameOptionTextLayout = styled('div')(({ theme }) => ({
  //받아오는 이미지의 크기가 정해져있어 height를 맞추어 주기 위해서
  display: 'flex',
  backgroundColor: '#7921D2',
  width: '100%',
  height: '10%',
}));

const GameOptionLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'center',
  backgroundColor: '#7777D2',
  overflow: 'hidden',
  width: '80%',
  height: '55%',
}));

function GameOptionModule() {
  return (
    <GameOptionLayout>
      <GameOption />
    </GameOptionLayout>
  );
}

export default GameOptionModule;
