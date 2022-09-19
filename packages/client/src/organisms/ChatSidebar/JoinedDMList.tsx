import { styled } from '@mui/material/styles';
import ListGenerate from '../../components/list/ListGenerate';
import UserProfileBox from '../../modules/ProfileSection/UserProfileBox';

const JoinedChatListLayout = styled('div')(({ theme }) => ({
  height: '43%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
}));

const JoinedDMBox = styled('div')(({ theme }) => ({
  marginTop: '6%',
  height: '87%',
  width: '90%',
  borderRadius: '13px',
  backgroundColor: '#001D7D',
}));

function JoinedDMListOrganisms() {
  return (
    <JoinedChatListLayout>
      <JoinedDMBox>{ListGenerate(UserProfileBox(true, 'circle'))}</JoinedDMBox>
    </JoinedChatListLayout>
  );
}

export default JoinedDMListOrganisms;
