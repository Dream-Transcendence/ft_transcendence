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
import NavProfile from '../avatar/NavProfile';
import ChatIconButton from '../button/icon/ChatIconButton';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import GameIconButton from '../button/icon/GameIconButton';
import LogoutIconButton from '../button/icon/LogoutIconButton';
import { flexbox } from '@mui/system';
import SearchBox from '../input/SearchBox';

const RightLayout = styled('section')(({ theme }) => ({
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',
}));

export default function NavigationBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <NavProfile />
          <GameIconButton />
          <ChatIconButton />
          <RightLayout>
            <SearchBox />
            <LogoutIconButton />
          </RightLayout>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
