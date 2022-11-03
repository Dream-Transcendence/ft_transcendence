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
import { Link, useNavigate } from 'react-router-dom';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

import { LinkIconProps, LinkIconResource } from '../../types/Link.type';
import LinkPageIconButton from '../button/linkPage/LinkPageIconButton';
import {
  CHANNELURL,
  CHATROOMURL,
  GAMECREATEURL,
  GAMELOADINGURL,
  GAMEPLAYURL,
  PROFILEURL,
  SERVERURL,
} from '../../configs/Link.url';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { SearchPropsType } from '../../types/search.type';
import useSearch from '../../hooks/useSearch';
import {
  gameTypeAtom,
  userDataAtom,
  userSecondAuth,
} from '../../recoil/user.recoil';
import { LADDER } from '../../configs/Game.type';
import CustomIconButton from '../button/icon/CustomIconButtion';
import { CustomIconProps } from '../../types/Link.type';
import axios from 'axios';

const NavLayout = styled('section')(({ theme }) => ({
  height: '100%',
  width: '100%',
  minWidth: '1200px',
  display: 'flex',
  backgroundColor: 'blue',
  // 'linear-gradient(45deg,rgba(188,110,255,1) 0%,rgba(0,221,255,1) 180%)',
}));

const RightLayout = styled('section')(({ theme }) => ({
  marginLeft: 'auto',
  width: '30%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'right',
}));

function NavigationBar() {
  const [userGameType, setUserGameType] = useRecoilState(gameTypeAtom);
  const [userData, setUserData] = useRecoilState(userDataAtom);
  const [secondAuth, setSecondAuth] = useRecoilState(userSecondAuth);
  const navigate = useNavigate();

  const searchProps: SearchPropsType = useSearch(
    `${SERVERURL}/users/search`,
    `${PROFILEURL}/`,
    5, //profile type
  );

  const logoutHandler = async () => {
    try {
      await axios.post(`${SERVERURL}/auth/logout`).then((res) => {
        setUserData({
          id: 0,
          nickname: 'default',
          image: '',
        });
        setSecondAuth({
          checkIsSecondOauth: false,
          checkIsValid: true,
        });
        navigate('/');
        console.log('logout!!');
      });
    } catch (error) {
      console.dir(error);
    }
  };

  const setLadder = () => {
    setUserGameType(LADDER);
  };

  const Avartar: LinkIconResource = {
    url: PROFILEURL,
    icon: <NavProfile />,
  };
  const Ladder: LinkIconResource = {
    url: GAMELOADINGURL,
    // url: GAMEPLAYURL + '1',
    // url: GAMECREATEURL,
    icon: <SportsEsportsIcon fontSize="inherit" />,
  };
  const Channels: LinkIconResource = {
    url: CHANNELURL,
    icon: <ChatIcon fontSize="inherit" />,
  };

  const chatAction: LinkIconProps = {
    iconResource: Channels,
  };

  const avartarAction: LinkIconProps = {
    iconResource: Avartar,
  };

  const ladderAction: LinkIconProps = {
    iconResource: Ladder,
    action: setLadder,
  };

  const logoutButton: CustomIconProps = {
    icon: <LogoutRoundedIcon />,
    action: logoutHandler,
  };

  // nav의 사이즈를 동적으로 바꾸고 싶었는데 몇번의 시도끝에 실패flexGrow: 1,
  return (
    <NavLayout>
      <Box sx={{ minWidth: '100px' }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <LinkPageIconButton linkIconProps={avartarAction} />
            {/* [axios POST 요청] 래더 게임 큐에 등록 요청 */}
            {/* [SocketIO 요청] 소켓을 쓸 것 같음.. 미지수 */}
            <LinkPageIconButton linkIconProps={ladderAction} />
            <LinkPageIconButton linkIconProps={chatAction} />
            <RightLayout>
              <SearchBox searchProps={searchProps} />
              <CustomIconButton customProps={logoutButton} />
            </RightLayout>
          </Toolbar>
        </AppBar>
      </Box>
    </NavLayout>
  );
}

export default NavigationBar;
