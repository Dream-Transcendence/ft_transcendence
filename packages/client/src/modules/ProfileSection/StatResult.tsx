import styled from '@emotion/styled';
import UserStatLose from '../../atoms/text/ProfileUserStatLose';
import UserStatWin from '../../atoms/text/ProfileUserStatWin';

const StatResultLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  alignSelf: 'center',
  width: '100%',
  height: '100%',
  border: 'solid 1px',
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
