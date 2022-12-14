import { styled } from '@mui/material/styles';
import NavProfile from '../profile/NavProfile';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ChatIcon from '@mui/icons-material/Chat';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import SearchBox from '../input/SearchBox';
import { useNavigate } from 'react-router-dom';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

import { LinkIconProps, LinkIconResource } from '../../types/Link.type';
import LinkPageIconButton from '../button/linkPage/LinkPageIconButton';
import {
  CHANNELURL,
  GAMELOADINGURL,
  LIVEOBSERVEURL,
  PROFILEURL,
} from '../../configs/Link.url';
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
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
import { getJoinedChatList } from '../../recoil/chat.recoil';
import { useEffect } from 'react';
import { UserSecondAuth } from '../../types/Profile.type';

const NavLayout = styled('section')(({ theme }) => ({
  height: '100%',
  width: '100%',
  minWidth: '1200px',
  backgroundColor: '#aa99ff',
  display: 'flex',
  flexDirection: 'row',
}));

const RightLayout = styled('section')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  paddingRight: '0.5%',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
}));

const LeftLayout = styled('section')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
}));

const LogoutLayout = styled('section')(({ theme }) => ({
  width: '5%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

function NavigationBar() {
  const setGameType = useSetRecoilState(gameTypeAtom);
  const [userData, setUserData] = useRecoilState(userDataAtom);
  const setSecondAuth = useSetRecoilState(userSecondAuth);
  const navigate = useNavigate();
  const passSecondOauth = useRecoilValue<UserSecondAuth>(userSecondAuth);
  const refreshUserInfo = useRecoilRefresher_UNSTABLE(
    getJoinedChatList(userData.id),
  );

  useEffect(() => {
    //???????????? ???????????? ???????????? ??????
    if (userData.id === 0 || passSecondOauth.checkIsValid === false)
      navigate('/');
  }, [userData.id, passSecondOauth, navigate]);

  const searchProps: SearchPropsType = useSearch(
    `${process.env.REACT_APP_SERVER_URL}/users/search`,
    `${PROFILEURL}/`,
    5, //profile type
  );

  const logoutHandler = async () => {
    try {
      await axios
        .post(`${process.env.REACT_APP_SERVER_URL}/auth/logout`)
        .then((res) => {
          setUserData({
            id: 0,
            nickname: 'xxxxxxxxxxxxxxx',
            image: '',
          });
          setSecondAuth({
            checkIsSecondOauth: false,
            checkIsValid: true,
          });
          navigate('/');
        });
    } catch (error) {
      // alert(error);
    }
  };

  const setLadder = () => {
    setGameType(LADDER);
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

  const LiveObserve: LinkIconResource = {
    url: LIVEOBSERVEURL,
    icon: <OndemandVideoIcon fontSize="inherit" />,
  };

  const chatAction: LinkIconProps = {
    iconResource: Channels,
    style: {
      marginTop: '1%',
    },
    action: refreshUserInfo,
  };

  const liveObeserveAction: LinkIconProps = {
    iconResource: LiveObserve,
    style: {
      marginTop: '1%',
    },
  };

  const avartarAction: LinkIconProps = {
    iconResource: Avartar,
  };

  const ladderAction: LinkIconProps = {
    iconResource: Ladder,
    action: setLadder,
    style: {
      marginTop: '1%',
    },
  };

  const logoutButton: CustomIconProps = {
    icon: <LogoutRoundedIcon />,
    action: logoutHandler,
  };

  // nav??? ???????????? ???????????? ????????? ???????????? ????????? ???????????? ??????
  return (
    <NavLayout>
      {/* <Box sx={{ flexGrow: 1, minWidth: '100px' }}> */}
      {/* <AppBar position="static">
          <Toolbar variant="dense"> */}
      <LeftLayout>
        <LinkPageIconButton linkIconProps={avartarAction} />
        {/* [axios POST ??????] ?????? ?????? ?????? ?????? ?????? */}
        {/* [SocketIO ??????] ????????? ??? ??? ??????.. ????????? */}
        <LinkPageIconButton linkIconProps={ladderAction} />
        <LinkPageIconButton linkIconProps={liveObeserveAction} />
        <LinkPageIconButton linkIconProps={chatAction} />
      </LeftLayout>
      <RightLayout>
        <SearchBox searchProps={searchProps} />
        <LogoutLayout>
          <CustomIconButton customProps={logoutButton} />
        </LogoutLayout>
      </RightLayout>
      {/* </Toolbar>
        </AppBar> */}
      {/* </Box> */}
    </NavLayout>
  );
}

export default NavigationBar;
