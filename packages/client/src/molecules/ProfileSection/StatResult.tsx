import styled from '@emotion/styled';
import UserStatLose from '../../atoms/text/ProfileUserStatLose';
import UserStatWin from '../../atoms/text/ProfileUserStatWin';
import { UserLadderType } from '../../types/Profile.type';

const StatResultLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  alignSelf: 'center',
  width: '100%',
  height: '100%',
  border: 'solid 1px',
}));

function UserStatResult(props: { userLadder: UserLadderType }) {
  const { winCount, loseCount } = props.userLadder;
  return (
    <StatResultLayout>
      {/* [axios GET 요청] 레더 승, 패 정보 불러오기 */}
      <UserStatWin value={winCount} />
      <UserStatLose value={loseCount} />
    </StatResultLayout>
  );
}

export default UserStatResult;
