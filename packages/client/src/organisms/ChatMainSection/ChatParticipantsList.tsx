import * as React from 'react';
import { styled } from '@mui/material/styles';
import UserChatParticipantsBox from '../../molecules/ProfileSection/UserChatParticipants';
import {
  ListGenerateLayout,
  ListUlLayout,
  ListLayout,
} from '../../atoms/list/styles/ListStylesCSS';
import {
  ParticipantInfoSet,
  ParticipantInfo,
} from '../../types/Participant.type';

const ChatParticipantsListLayout = styled('div')(({ theme }) => ({
  width: '98%',
  height: '90%',
}));

function ChatParticipantsListOrganisms(prop: {
  participantInfoSet: ParticipantInfoSet;
}) {
  const { participantInfo: participantArray, handler } =
    prop.participantInfoSet;

  function compare(a: ParticipantInfo, b: ParticipantInfo) {
    if (a.user.nickname < b.user.nickname) {
      return -1;
    }
    if (a.user.nickname > b.user.nickname) {
      return 1;
    }
    return 0;
  }
  participantArray.sort(compare);
  const listElement: React.ReactElement[] = participantArray.map(
    (participant: any) => {
      return (
        <ListLayout key={participant.user.id}>
          <UserChatParticipantsBox
            participantInfo={participant}
            participantInfoArray={participantArray}
            handler={handler}
          />
        </ListLayout>
      );
    },
  );
  return (
    <ChatParticipantsListLayout>
      {/* [axios GET 요청] 채팅 참여자 목록 요청 */}
      {/* [Socket IO 요청]
        - Socket.emit으로 로그인 상태 보냄
        - Socket.on으로  DM유저 로그인 상태 받음
            */}
      <ListGenerateLayout>
        <ListUlLayout>{listElement}</ListUlLayout>
      </ListGenerateLayout>
    </ChatParticipantsListLayout>
  );
}

export default ChatParticipantsListOrganisms;
