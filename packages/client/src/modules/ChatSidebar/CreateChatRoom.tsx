import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import SettingRoomConfigOranisms from '../../organisms/ChatPopUp/SettingRoomConfig';

const CreateChatRoomLayout = styled('div')(({ theme }) => ({
  height: '7.89%',
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
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <CreateChatRoomLayout>
      <AsideButtonBox>
        <Button onClick={handleToggle} variant="contained">
          Create room
        </Button>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <SettingRoomConfigOranisms />
        </Backdrop>
      </AsideButtonBox>
    </CreateChatRoomLayout>
  );
}

export default CreateChatRoomModule;
