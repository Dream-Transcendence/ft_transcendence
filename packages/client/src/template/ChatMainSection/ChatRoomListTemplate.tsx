import * as React from 'react';
import { styled } from '@mui/material/styles';
import ChatRoomElementOrganisms from '../../organisms/ChatMainSection/ChatRoomElement';
import {
  ListGenerateLayout,
  ListLayout,
  ListUlLayout,
} from '../../atoms/list/styles/ListStylesCSS';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userDataAtom, userSecondAuth } from '../../recoil/user.recoil';
import { UserSecondAuth } from '../../types/Profile.type';
import { UnJoinedRoomList } from '../../types/Room.type';

const ChattingRoomListLayout = styled('div')(({ theme }) => ({
  marginTop: '1%',
  width: '97%',
  height: '99%',
  marginLeft: '2%',
}));

/*
 * public, protect, 가입된 방 제외 채팅방 목록을 나타내는 템플릿입니다.
 */
function ChatRoomListTemplate(props: { roomList: UnJoinedRoomList[] }) {
  const userData = useRecoilValue(userDataAtom);
  const navigate = useNavigate();
  const passSecondOauth = useRecoilValue<UserSecondAuth>(userSecondAuth);

  useEffect(() => {
    //정상적인 접근인지 판단하는 로직
    if (userData.id === 0 || passSecondOauth.checkIsValid === false)
      navigate('/');
  }, [userData.id, passSecondOauth, navigate]);

  const roomList = props.roomList;
  const listElement: React.ReactElement[] = roomList.map(
    (room: UnJoinedRoomList) => {
      return (
        <ListLayout key={room.id}>
          <ChatRoomElementOrganisms roomInfo={room} />
        </ListLayout>
      );
    },
  );

  return (
    <ChattingRoomListLayout>
      <ListGenerateLayout>
        <ListUlLayout>{listElement}</ListUlLayout>
      </ListGenerateLayout>
    </ChattingRoomListLayout>
  );
}

export default ChatRoomListTemplate;
