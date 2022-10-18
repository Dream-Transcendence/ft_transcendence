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
const ChatLogLayout = styled('div')(({ theme }) => ({
  width: '90%',
  height: '92%',
  display: 'flex',
  flexDirection: 'column-reverse',
}));

function ChatLogListOrganisms(props: { messageSetter: ControlMessage }) {
  const { messages, setMessages } = props.messageSetter;
  const listElement: React.ReactElement[] = messages.map((msg: any) => {
    return (
      <ListChatLayout key={msg.user.id}>
        <MessageBox message={msg} />
      </ListChatLayout>
    );
  });

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
