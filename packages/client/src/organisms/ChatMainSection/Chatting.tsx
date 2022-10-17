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
function ChattingOrganisms(prop: any) {
  const { roomId } = useParams();
  const [MessageHistory, setMessageHistory] = useState<ReceivedMessage[]>([]);
  const userState = useRecoilValue(userStatus);

  useEffect(() => {
    async function getMessageHistory() {
      const response = await axios.get(`${SERVERURL}/rooms/messages/${roomId}`);
      setMessageHistory(response.data);
      console.log('get message', response.data);
    }
    getMessageHistory();
  }, [roomId]);

  const messageSetter: ControlMessage = {
    messages: MessageHistory,
    setMessages: setMessageHistory,
  };

  return (
    <ChattingLayout>
      <ChatLogListOrganisms messageSetter={messageSetter} />
      {userState !== MUTE && <ChatInputModule />}
    </ChattingLayout>
  );
}

export default ChattingOrganisms;
