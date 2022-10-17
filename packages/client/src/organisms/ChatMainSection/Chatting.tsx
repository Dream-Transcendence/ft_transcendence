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

const ChattingLayout = styled('div')(({ theme }) => ({
  width: '75%',
  height: '99%',
  display: 'flex',
  flexDirection: 'column-reverse',
}));
// prop 변수를 안넣어주니  has no properties in common with type 'IntrinsicAttributes'. 라는 에러발생
function ChattingOrganisms(prop: any) {
  const { roomId } = useParams();
  const [MessageHistory, setMessageHistory] = useState();
  const userState = useRecoilValue(userStatus);

  useEffect(() => {
    async function getMessageHistory() {
      const response = await axios.get(`${SERVERURL}/rooms/{roomId}/messages`);
      setMessageHistory(response.data);
    }
  });

  return (
    <ChattingLayout>
      {userState !== MUTE && <ChatInputModule></ChatInputModule>}
      <ChatLogListOrganisms />
    </ChattingLayout>
  );
}

export default ChattingOrganisms;
