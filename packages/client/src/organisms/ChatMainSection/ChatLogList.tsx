import { styled } from '@mui/material/styles';
import ChatProfileNText from '../../atoms/textPrompt/ChatProfileNText';
import ListGenerate from '../../atoms/list/ListGenerate';

const ChatLogLayout = styled('div')(({ theme }) => ({
  width: '90%',
  height: '92%',
  display: 'flex',
  flexDirection: 'column-reverse',
}));

function ChatLogListOrganisms() {
  return (
    <ChatLogLayout>
      {/* [axios GET 요청]해당 채팅방의 모든 로그 요청 */}
      <ListGenerate element={<ChatProfileNText />} />
    </ChatLogLayout>
  );
}

export default ChatLogListOrganisms;
