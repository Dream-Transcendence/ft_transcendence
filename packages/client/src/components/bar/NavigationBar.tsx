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
import NavProfile from '../../atoms/NavProfile';
import ChatIconButton from '../button/icon/ChatIconButton';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import GameIconButton from '../button/icon/GameIconButton';
import LogoutIconButton from '../button/icon/LogoutIconButton';
import { flexbox } from '@mui/system';
import SearchBox from '../input/SearchBox';

const NavLayout = styled('section')(({ theme }) => ({
  height: '100%',
  width: '100%',
  display: 'flex',
}));

const RightLayout = styled('section')(({ theme }) => ({
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'right',
}));

export default function NavigationBar() {
  // nav의 사이즈를 동적으로 바꾸고 싶었는데 몇번의 시도끝에 실패
  return (
    <NavLayout>
      <Box sx={{ flexGrow: 1, minWidth: '800px' }}>
        <AppBar position="static">
          <Toolbar variant="dense">
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
    </NavLayout>
  );
}
