import { styled } from '@mui/material/styles';
import ChatInputModule from '../../molecules/ChatSection/ChatInput';
import ChatLogListOrganisms from './ChatLogList';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SERVERURL } from '../../configs/Link.url';
import { useRecoilValue } from 'recoil';
import { userStatus } from '../../recoil/chat.recoil';
import { MUTE } from '../../configs/Status.case';
import { ControlMessage, ReceivedMessage } from '../../types/Message.type';

const ChattingLayout = styled('div')(({ theme }) => ({
  width: '75%',
  height: '99%',
  display: 'flex',
  flexDirection: 'column',
}));
// prop 변수를 안넣어주니  has no properties in common with type 'IntrinsicAttributes'. 라는 에러발생
function ChattingOrganisms() {
  const { roomId } = useParams();
  const userState = useRecoilValue(userStatus);
  const [MessageHistory, setMessageHistory] = useState<ReceivedMessage[]>([]);
  const messageSetter: ControlMessage = {
    messages: MessageHistory,
    setMessages: setMessageHistory,
  };

  useEffect(() => {
    setMessageHistory([]);
    return setMessageHistory([]);
  }, [roomId, setMessageHistory]);
  // console.log('데이터 받아오기 전', messageSetter.messages);

  return (
    <ChattingLayout>
      <ChatLogListOrganisms messageSetter={messageSetter} />
      {userState !== MUTE && <ChatInputModule messageSetter={messageSetter} />}
    </ChattingLayout>
  );
}

export default ChattingOrganisms;
