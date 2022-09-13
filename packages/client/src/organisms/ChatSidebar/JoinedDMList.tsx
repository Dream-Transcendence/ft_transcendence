import { styled } from '@mui/material/styles';
import ListGenerate from '../../components/list/ListGenerate';
import UserProfileBox from '../../modules/ProfileSection/UserProfileBox';

const JoinedChatListLayout = styled('div')(({ theme }) => ({
  height: '45%',
}));

function JoinedDMListOrganisms() {
  return (
    <JoinedChatListLayout>
      {ListGenerate(<UserProfileBox />)}
    </JoinedChatListLayout>
  );
}

export default JoinedDMListOrganisms;
