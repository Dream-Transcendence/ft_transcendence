import * as React from 'react';
import { styled } from '@mui/material/styles';
import ListGenerate from '../../atoms/list/ListGenerate';
import UserChatParticipantsBox from '../../molecules/ProfileSection/UserChatParticipants';
import BasicSpeedDial from '../../atoms/SpeedDial/SpeedDial';

const ChatParticipantsListLayout = styled('div')(({ theme }) => ({
  width: '98%',
  height: '90%',
}));

function ChatParticipantsListOrganisms() {
  return (
    <ChatParticipantsListLayout>
      {/* [axios GET 요청] 채팅 참여자 목록 요청 */}
      {/* [Socket IO 요청]
        - Socket.emit으로 로그인 상태 보냄
        - Socket.on으로  DM유저 로그인 상태 받음
            */}
      <ListGenerate element={<UserChatParticipantsBox />} />
    </ChatParticipantsListLayout>
  );
}

export default ChatParticipantsListOrganisms;
