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
import { gameTypeAtom } from '../../recoil/user.recoil';
import { LADDER } from '../../configs/Game.type';

const NavLayout = styled('section')(({ theme }) => ({
  height: '100%',
  width: '100%',
  minWidth: '100px',
  display: 'flex',
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

  const searchProps: SearchPropsType = useSearch(
    `${SERVERURL}/users/search`,
    `${PROFILEURL}/`,
    5, //profile type
  );

  const setLadder = () => {
    setUserGameType(LADDER);
  };

  const Avartar: LinkIconResource = {
    url: PROFILEURL,
    icon: <NavProfile />,
  };
  const Ladder: LinkIconResource = {
    url: GAMELOADINGURL, //[수정사항][게임]임시 수정 doyun님 작업끝나면 원래대로 돌릴 것
    // url: GAMEPLAYURL + '1',
    // url: GAMECREATEURL,
    icon: <SportsEsportsIcon fontSize="inherit" />,
  };
  const Channels: LinkIconResource = {
    // url: CHANNELURL,
    url: '/pingpong/channel/room/4',
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

  // nav의 사이즈를 동적으로 바꾸고 싶었는데 몇번의 시도끝에 실패
  return (
    <NavLayout>
      <Box sx={{ flexGrow: 1, minWidth: '100px' }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <LinkPageIconButton linkIconProps={avartarAction} />
            {/* [axios POST 요청] 래더 게임 큐에 등록 요청 */}
            {/* [SocketIO 요청] 소켓을 쓸 것 같음.. 미지수 */}
            <LinkPageIconButton linkIconProps={ladderAction} />
            <LinkPageIconButton linkIconProps={chatAction} />
            <RightLayout>
              <SearchBox searchProps={searchProps} />
              <LogoutIconButton />
            </RightLayout>
          </Toolbar>
        </AppBar>
      </Box>
    </NavLayout>
  );
}

export default NavigationBar;
