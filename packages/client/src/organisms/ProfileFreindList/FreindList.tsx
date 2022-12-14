import styled from '@emotion/styled';
import UserProfileBox from '../../molecules/ProfileSection/UserProfileBox';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FriendType, UserProfileBoxType } from '../../types/Profile.type';
import { PROFILEURL, GAMEPLAYURL } from '../../configs/Link.url';
import { useEffect, useRef, useState } from 'react';

import {
  ListGenerateLayout,
  ListLayout,
  ListUlLayout,
} from '../../atoms/list/styles/ListStylesCSS';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userLogStateListAtom } from '../../recoil/user.recoil';
import { FriendPropsType } from '../ProfilePersonal/ProfilePersonal';
import { gameNameSpace, WATCH } from '../../socket/event';
import useSocket from '../../socket/useSocket';

import CustomIconButton from '../../atoms/button/icon/CustomIconButtion';
import { CustomIconProps } from '../../types/Link.type';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ConnectionDto } from '../../types/LogOn.type';
import { getUserState } from '../../atoms/profile/ProfileAvatar';

import { GameRoomDto } from '../../types/Game.type';
import { gameInfoAtom } from '../../recoil/game.recoil';

const FreindListLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'end',
  justifySelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  height: '42%',
  width: '77%',
  gridArea: 'FreindList',
  borderRadius: '7%',
  background:
    'linear-gradient(135deg,rgba(110,177,255,1) 0%,rgba(118,0,255,1) 120%)',
  boxShadow: '0 15px 35px #00000066',
}));

const TextLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '10%',
  //borderBottom: 'solid 1px',
}));

const ProfileBoxLayout = styled('div')(({ theme }) => ({
  width: '90%',
  height: '80%',
  borderColor: 'black',
  borderRadius: '2rem',
  border: 'solid 2px #cccccc77',
}));

function FreindList(props: { friendProps: FriendPropsType }) {
  const setGameInfo = useSetRecoilState(gameInfoAtom);
  const navigate = useNavigate();
  const { value: friendList } = props.friendProps;
  const [listElement, setListElement] = useState<JSX.Element[]>();
  const [onGame, setOnGame] = useState<boolean>(false);
  const userLogStateList =
    useRecoilValue<ConnectionDto[]>(userLogStateListAtom);
  let userState = useRef<string | undefined>();
  const [socket, connect, disconnect] = useSocket(gameNameSpace);

  useEffect(() => {
    if (userLogStateList.some((user) => user.onGame === true)) {
      connect();
      setOnGame(true);
    } else {
      // if (onGame) {
      disconnect();
      setOnGame(false);
      // }
    }
  }, [userLogStateList]);

  useEffect(() => {
    if (friendList.length > 0) {
      const element = friendList.map((friendData: FriendType) => {
        //friend???????????? profileBox??? ??????????????? ????????? ????????? ?????????
        const userData = {
          id: friendData.user.id,
          nickname: friendData.user.nickname,
          image: friendData.user.image,
        };
        const otherProfileBoxProp: UserProfileBoxType = {
          isButton: true,
          avatarType: 'circle',
          userData: userData,
          action: () => {
            navigate(`${PROFILEURL}/${friendData.user.id}`);
          },
        };

        function handlerObserver() {
          socket.emit(
            WATCH,
            {
              userId: userData.id,
            },
            (res: GameRoomDto) => {
              setGameInfo(res);
              navigate(`${GAMEPLAYURL}/${res.title}`);
            },
          );
        }
        userState.current = getUserState(userLogStateList, userData.id);
        const customProps: CustomIconProps = {
          icon: <VisibilityIcon />,
          action: handlerObserver,
        };

        return (
          <ListLayout key={friendData.user.id}>
            <UserProfileBox userProfileBoxProps={otherProfileBoxProp} />
            {userState.current === 'onGame' && (
              <CustomIconButton customProps={customProps} />
            )}
          </ListLayout>
        );
      });
      setListElement(element);
    }
  }, [friendList, navigate, userLogStateList]);

  /**
   * ????????????
   */
  useEffect(() => {
    socket.on('exception', (error) => {
      alert(error.message);
    });
    return () => {
      socket.off('exception');
    };
  }, []);

  return (
    <FreindListLayout>
      <TextLayout>
        <Typography variant="h6" align="center">
          friend list
        </Typography>
      </TextLayout>
      <ProfileBoxLayout>
        <ListGenerateLayout>
          {/* [axios GET ??????] ?????? ????????? ???????????? */}
          {/* [Socket IO ??????]
                - Socket.emit?????? ????????? ?????? ??????
                - Socket.on?????? ???????????? ????????? ?????? ??????
                  useEffect??? ???????????? socket ?????? ??????????????? return??? socket ???????????? ??? ??? 
                   */}
          <ListUlLayout>{listElement}</ListUlLayout>
        </ListGenerateLayout>
      </ProfileBoxLayout>
    </FreindListLayout>
  );
}

export default FreindList;
