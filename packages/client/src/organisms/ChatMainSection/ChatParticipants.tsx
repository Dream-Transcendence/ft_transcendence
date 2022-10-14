import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ChatParticipantsListOrganisms from './ChatParticipantsList';
import BasicSpeedDial from '../../atoms/SpeedDial/SpeedDial';
import { ParticipantInfoSet } from '../../types/Participant.type';

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

function ChatParticipantsOrganisms(prop: {
  participantInfoSet: ParticipantInfoSet;
}) {
  const participantInfoSet = prop.participantInfoSet;
  //[수정사항] 임시조건문 아예 DM일땐 들어오면 안됨.
  return (
    <ChatParticipantsLayout>
      {participantInfoSet.participantInfo[0] !== null && (
        <ChatParticipantBox>
          <ParticipantsBoxTitle>
            <Typography color="white" marginTop={1}>
              채팅방 인원
            </Typography>
            <ChatParticipantsListOrganisms
              participantInfoSet={participantInfoSet}
            />
          </ParticipantsBoxTitle>
        </ChatParticipantBox>
      )}
    </ChatParticipantsLayout>
  );
}

export default ChatParticipantsOrganisms;
