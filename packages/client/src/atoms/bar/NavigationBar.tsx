import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NavProfile from '../profile/NavProfile';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIconButton from '../button/icon/LogoutIconButton';
import { flexbox } from '@mui/system';
import SearchBox from '../input/SearchBox';
import { Link } from 'react-router-dom';
import LinkPageButton from '../button/linkPage/LinkPageIconButton';
import LinkPageIconButton from '../button/linkPage/LinkPageIconButton';
import { LinkIconResource } from '../../types/Link.type';

const NavLayout = styled('section')(({ theme }) => ({
  height: '100%',
  width: '100%',
  minWidth: '100px',
  display: 'flex',
}));

const RightLayout = styled('section')(({ theme }) => ({
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'right',
}));

export default function NavigationBar() {
  const Avartar: LinkIconResource = {
    url: '/pingpong/profile',
    icon: <NavProfile />,
  };
  const Ladder: LinkIconResource = {
    url: '/pingpong/gameloding',
    icon: <SportsEsportsIcon fontSize="inherit" />,
  };
  const ChatRoom: LinkIconResource = {
    url: '/pingpong/chatroom',
    icon: <ChatIcon fontSize="inherit" />,
  };

  // nav의 사이즈를 동적으로 바꾸고 싶었는데 몇번의 시도끝에 실패
  return (
    <NavLayout>
      <Box sx={{ flexGrow: 1, minWidth: '100px' }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <LinkPageIconButton LinkIconResource={Avartar} />
            <LinkPageIconButton LinkIconResource={Ladder} />
            <LinkPageIconButton LinkIconResource={ChatRoom} />
            <RightLayout>
              <SearchBox />
              <LogoutIconButton />
            </RightLayout>
          </Toolbar>
        </AppBar>
      </Box>
    </NavLayout>
  );
}
