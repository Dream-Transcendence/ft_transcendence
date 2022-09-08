import { styled } from '@mui/material/styles';

const CreateChatRoomLayout = styled('div')(({ theme }) => ({
  backgroundColor: 'black',
  height: '8.8%', //부모의 컴포넌트 크기가 남아 있는만큼만 하고 싶은데 못찾았다 찾아서 바꿔야지
}));

function AisdeCreateChatRoomModule() {
  return <CreateChatRoomLayout></CreateChatRoomLayout>;
}

export default AisdeCreateChatRoomModule;
