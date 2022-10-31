import styled from '@emotion/styled';
import UserProfileBox from '../../molecules/ProfileSection/UserProfileBox';
import { Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import {
  BaseUserProfileData,
  FriendType,
  UserProfileBoxType,
} from '../../types/Profile.type';
import { PROFILEURL, SERVERURL } from '../../configs/Link.url';
import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
  ListGenerateLayout,
  ListLayout,
  ListUlLayout,
} from '../../atoms/list/styles/ListStylesCSS';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userDataAtom, userLogStateListAtom } from '../../recoil/user.recoil';
import { FriendPropsType } from '../ProfilePersonal/ProfilePersonal';
import {
  FRIENDREQUESTACCEPTED,
  gameNameSpace,
  REJECTFRIENDREQUEST,
  userNameSpace,
  WATCH,
} from '../../socket/event';
import useSocket from '../../socket/useSocket';
import { InviteInfoListType } from '../../types/Message.type';
import { inviteInfoListAtom } from '../../recoil/common.recoil';
import CustomIconButton from '../../atoms/button/icon/CustomIconButtion';
import { CustomIconProps } from '../../types/Link.type';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ConnectionDto } from '../../types/LogOn.type';
import { getUserState } from '../../atoms/profile/ProfileAvatar';
import { Socket } from 'socket.io-client';
import { WatchGameType } from '../../types/Game.type';

const FreindListLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'end',
  justifySelf: 'start',
  alignItems: 'center',
  height: '42%',
  width: '50%',
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
  display: 'flex',
  alignSelf: 'start',
  justifySelf: 'start',
  width: '100%',
  height: '90%',
  borderBottom: 'solid 1px',
  borderColor: 'black',
}));

function FreindList(props: { friendProps: FriendPropsType }) {
  const navigate = useNavigate();
  const { value: friendList, setter: setFriendList } = props.friendProps;
  const [listElement, setListElement] = useState<JSX.Element[]>();
  const userLogStateList =
    useRecoilValue<ConnectionDto[]>(userLogStateListAtom);
  let userState = useRef<string | undefined>();
  const [socket] = useSocket(gameNameSpace);

  useEffect(() => {
    if (friendList.length > 0) {
      const element = friendList.map((friendData: FriendType) => {
        //friend데이터중 profileBox를 구현하기에 필요한 정보를 넣어줌
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
            (res: WatchGameType) => {
              // navigate(`GAMEPLAYURL/${res}`);
              console.log('enter! ', res);
            },
          );
        }

        console.log('!!!!!!!', userLogStateList, userData.id);
        userState.current = getUserState(userLogStateList, userData.id);
        const customProps: CustomIconProps = {
          icon: <VisibilityIcon />,
          action: handlerObserver,
        };
        console.log(userState.current, 'cunrrr');

        return (
          <ListLayout key={friendData.user.id}>
            <UserProfileBox userProfileBoxProps={otherProfileBoxProp} />
            {/* {userState.current === 'onGame' && (
              <CustomIconButton customProps={customProps} />
            )} */}
          </ListLayout>
        );
      });
      setListElement(element);
    }
  }, [friendList, navigate]);

  return (
    <FreindListLayout>
      <TextLayout>
        <Typography variant="h6" align="center">
          friend list
        </Typography>
      </TextLayout>
      <ProfileBoxLayout>
        <ListGenerateLayout>
          {/* [axios GET 요청] 친구 리스트 불러오기 */}
          {/* [Socket IO 요청]
                - Socket.emit으로 로그인 상태 보냄
                - Socket.on으로 친구유저 로그인 상태 받음
                  useEffect로 마운트시 socket 열고 언마운트시 return에 socket 닫아주면 될 듯 
                   */}
          <ListUlLayout>{listElement}</ListUlLayout>
        </ListGenerateLayout>
      </ProfileBoxLayout>
    </FreindListLayout>
  );
}

export default FreindList;
