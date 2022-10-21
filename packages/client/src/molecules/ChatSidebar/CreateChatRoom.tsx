import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import SettingRoomConfigOranisms from '../../organisms/ChatPopUp/SettingRoomConfig';
import { useRecoilValue } from 'recoil';
import { userDataAtom } from '../../recoil/user.recoil';

const CreateChatRoomLayout = styled('div')(({ theme }) => ({
  height: '5.89%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '10%',
}));

const AsideButtonBox = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
}));

function CreateChatRoomModule() {
  const [open, setOpen] = React.useState(false);
  const user = useRecoilValue(userDataAtom);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  //각자 user마다 다른 참가인원리스트를 가지게하기위해 구분하는 작업

  return (
    <CreateChatRoomLayout>
      <AsideButtonBox>
        <Button onClick={handleToggle} variant="contained">
          Create room
        </Button>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          {SettingRoomConfigOranisms(handleClose)}
        </Backdrop>
      </AsideButtonBox>
    </CreateChatRoomLayout>
  );
}

export default CreateChatRoomModule;
