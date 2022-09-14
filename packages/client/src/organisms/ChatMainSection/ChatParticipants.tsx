import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ChatParticipantsListOrganisms from './ChatParticipantsList';
import BasicSpeedDial from '../../components/SpeedDial/SpeedDial';

const ChatParticipantsLayout = styled('div')(({ theme }) => ({
  width: '40%',
  height: '99%',
  display: 'float',
  textAlignLast: 'center',
}));

const ChatParticipantBox = styled('div')(({ theme }) => ({
  width: '100%',
  height: '65%',
  backgroundColor: '#003566',
  borderRadius: '15px',
  float: 'right',
  marginTop: '40%',
  marginRight: '13%',
}));

const ParticipantsBoxTitle = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
}));

// prop 변수를 안넣어주니  has no properties in common with type 'IntrinsicAttributes'. 라는 에러발생
function ChatParticipantsOrganisms(prop: any) {
  return (
    <ChatParticipantsLayout>
      <ChatParticipantBox>
        <ParticipantsBoxTitle>
          <Typography color="white" marginTop={1}>
            채팅방 인원
          </Typography>
          <ChatParticipantsListOrganisms />
        </ParticipantsBoxTitle>
      </ChatParticipantBox>
    </ChatParticipantsLayout>
  );
}

export default ChatParticipantsOrganisms;
