import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ChatParticipantsListOrganisms from './ChatParticipantsList';
import BasicSpeedDial from '../../atoms/SpeedDial/SpeedDial';
import {
  ParticipantInfo,
  ParticipantInfoSet,
} from '../../types/Participant.type';
import { useEffect } from 'react';
import useSocket from '../../socket/useSocket';
import { chatNameSpace, patchUserInfo } from '../../socket/event';

const ChatParticipantsLayout = styled('div')(({ theme }) => ({
  width: '30%',
  height: '99%',
  display: 'float',
  float: 'right',
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
