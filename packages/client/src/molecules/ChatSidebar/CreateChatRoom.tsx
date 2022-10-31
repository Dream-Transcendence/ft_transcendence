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

const CreateButton = styled('button')(({ theme }) => ({
  background: 'linear-gradient(to bottom right, #f796c0, #76aef1)',
  fontFamily: 'Lato, sans-serif',
  fontWeight: 500,
  marginTop: '-10%',
  borderRadius: '5px',
  boxShadow: '0 15px 35px #00000066',
  padding: '10px 25px',
  fontSize: '20px',
  border: 'none',
  color: 'whitesmoke',
  transition: '0.25s',
  '&:hover': {
    letterSpacing: '2px',
    transform: '120%',
    cursor: 'pointer',
  },
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
        <CreateButton onClick={handleToggle}>Create room</CreateButton>
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
