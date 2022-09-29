import { styled } from '@mui/material/styles';
import ListGenerate from '../../atoms/list/ListGenerate';
import UserProfileBox from '../../molecules/ProfileSection/UserProfileBox';

const JoinedChatListLayout = styled('div')(({ theme }) => ({
  height: '40%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
}));

const JoinedDMBox = styled('div')(({ theme }) => ({
  marginTop: '6%',
  height: '80%',
  width: '90%',
  borderRadius: '13px',
  backgroundColor: '#001D7D',
}));

function JoinedDMListOrganisms() {
  return (
    <JoinedChatListLayout>
      <JoinedDMBox>
        <ListGenerate element={UserProfileBox({ isButton: true, avatarType: 'circle' })} />
      </JoinedDMBox>
    </JoinedChatListLayout>
  );
}

export default JoinedDMListOrganisms;
