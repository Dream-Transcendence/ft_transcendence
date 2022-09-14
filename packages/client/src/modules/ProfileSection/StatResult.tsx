import styled from '@emotion/styled';
import UserStatLose from '../../components/text/ProfileUserStatLose';
import UserStatWin from '../../components/text/ProfileUserStatWin';

const StatResultLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  alignSelf: 'center',
  width: '100%',
  height: '100%',
  border: 'solid',
}));

function UserStatResult() {
  return (
    <StatResultLayout>
      <UserStatWin />
      <UserStatLose />
    </StatResultLayout>
  );
}

export default UserStatResult;