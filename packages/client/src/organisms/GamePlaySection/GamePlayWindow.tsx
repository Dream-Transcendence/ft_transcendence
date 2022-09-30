import styled from '@emotion/styled';
import GameResultModal from '../../molecules/GameSecton/GameResultMadal';

const GameWindowLayout = styled('div')(({ theme }) => ({
  backgroundColor: 'black',
  width: '100%',
  height: '90%',
}));

function GamePlayWindowOrganism() {
  return (
    <GameWindowLayout>
      {/* [axios GET 요청] 게임 종료 시, 게임 결과 요청 */}
      {/* [axios POST 요청] 게임 종료 시, 게임 결과 업데이트 (통합해서 할 수도?) */}
      <GameResultModal />
    </GameWindowLayout>
  );
}

export default GamePlayWindowOrganism;
