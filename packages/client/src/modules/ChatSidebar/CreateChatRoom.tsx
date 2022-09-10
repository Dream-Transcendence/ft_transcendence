import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const CreateChatRoomLayout = styled('div')(({ theme }) => ({
  backgroundColor: '',
  height: '7.89%', //부모의 컴포넌트 크기가 남아 있는만큼만 하고 싶은데 못찾았다 찾아서 바꿔야지
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const AsideButtonBox = styled('div')(({ theme }) => ({
  height: '70%',
  display: 'flex',
  flexDirection: 'row',
}));

function CreateChatRoomModule() {
  return (
    <CreateChatRoomLayout>
      <AsideButtonBox>
        <Button variant="contained">Create room</Button>
      </AsideButtonBox>
    </CreateChatRoomLayout>
  );
}

export default CreateChatRoomModule;
