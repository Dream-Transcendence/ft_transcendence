import { styled } from '@mui/material/styles';
import SectionChatInputModule from '../../modules/ChatSection/SectionChatInput';
import ChatLogListModule from '../../modules/ChatSection/SectionChatLogList';

const ChattingLayout = styled('div')(({ theme }) => ({
  width: '75%',
  height: '99%',
  display: 'flex',
  flexDirection: 'column-reverse',
}));
// prop 변수를 안넣어주니  has no properties in common with type 'IntrinsicAttributes'. 라는 에러발생
function Chatting(prop: any) {
  return (
    <ChattingLayout>
      <SectionChatInputModule></SectionChatInputModule>
      <ChatLogListModule></ChatLogListModule>
    </ChattingLayout>
  );
}

export default Chatting;
