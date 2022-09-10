import { styled } from '@mui/material/styles';
import ChatInputModule from '../../modules/ChatSection/ChatInput';
import ChatLogListOranisms from './ChatLogList';

const ChattingLayout = styled('div')(({ theme }) => ({
  width: '75%',
  height: '99%',
  display: 'flex',
  flexDirection: 'column-reverse',
}));
// prop 변수를 안넣어주니  has no properties in common with type 'IntrinsicAttributes'. 라는 에러발생
function ChattingOrganisms(prop: any) {
  return (
    <ChattingLayout>
      <ChatInputModule></ChatInputModule>
      <ChatLogListOranisms />
    </ChattingLayout>
  );
}

export default ChattingOrganisms;
