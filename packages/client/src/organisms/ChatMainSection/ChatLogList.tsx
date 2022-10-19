import { styled } from '@mui/material/styles';
import ListGenerate from '../../atoms/list/ListGenerate';
import { ControlMessage, ReceivedMessage } from '../../types/Message.type';
import MessageBox from '../../atoms/textPrompt/MessageBox';
import {
  ListChatLayout,
  ListChatUlLayout,
  ListGenerateLayout,
  ListLayout,
  ListUlLayout,
} from '../../atoms/list/styles/ListStylesCSS';
import { useEffect } from 'react';
import useSocket from '../../socket/useSocket';
import {
  chatNameSpace,
  patchMessage,
  patchUserInfo,
  USERMESSAGE,
} from '../../socket/event';
const ChatLogLayout = styled('div')(({ theme }) => ({
  width: '90%',
  height: '92%',
  display: 'flex',
  flexDirection: 'column-reverse',
}));

function ChatLogListOrganisms(props: { messageSetter: ControlMessage }) {
  const { messages, setMessages } = props.messageSetter;
  const [socket] = useSocket(chatNameSpace);
  //[수정사항] 로그인 붙이면 작업할 것 상태변경메시지 브로드캐스트
  useEffect(() => {
    socket.on(`${patchMessage}`, (res) => {
      console.log(res);
      // setMessages([...messages, res]);
    });
  }, [messages]);

  useEffect(() => {
    socket.on(`${USERMESSAGE}`, (res) => {
      console.log(res);
      // setMessages([...messages, res]);
    });
  }, [messages]);
  const listElement: React.ReactElement[] = messages.map(
    (msg: any, index: number) => {
      return (
        <ListChatLayout key={index}>
          <MessageBox message={msg} />
        </ListChatLayout>
      );
    },
  );

  return (
    <ChatLogLayout>
      {/* [axios GET 요청]해당 채팅방의 모든 로그 요청 */}
      <ListGenerateLayout>
        <ListChatUlLayout>{listElement}</ListChatUlLayout>
      </ListGenerateLayout>
    </ChatLogLayout>
  );
}

export default ChatLogListOrganisms;
