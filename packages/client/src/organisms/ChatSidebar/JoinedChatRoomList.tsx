import { styled } from '@mui/material/styles';
import ListGenerate from '../../atoms/list/ListGenerate';
import ProfileChatRoomBox from '../../modules/ProfileSection/ProfileChatRoomBox';

const JoinedChatRoomLayout = styled('div')(({ theme }) => ({
  height: '35.3%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
}));

const JoinedChatRoomBox = styled('div')(({ theme }) => ({
  marginTop: '6%',
  marginBottom: '4%',
  height: '87%',
  width: '90%',
  borderRadius: '13px',
  backgroundColor: '#001D3D',
}));

const BoxLayout = styled('div')(({ theme }) => ({
  height: '100%',
  marginLeft: '3%',
}));

function JoinedChatRoomModule() {
  return (
    <JoinedChatRoomLayout>
      <JoinedChatRoomBox>
        <BoxLayout>
          {ListGenerate(<ProfileChatRoomBox image="picture things" />)}
        </BoxLayout>
      </JoinedChatRoomBox>
    </JoinedChatRoomLayout>
  );
}

export default JoinedChatRoomModule;
