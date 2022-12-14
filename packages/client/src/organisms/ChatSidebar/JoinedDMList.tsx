import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import {
  ListGenerateLayout,
  ListLayout,
  ListUlLayout,
} from '../../atoms/list/styles/ListStylesCSS';
import UserProfileBox from '../../molecules/ProfileSection/UserProfileBox';
import { DMList, getJoinedChatList } from '../../recoil/chat.recoil';
import { userDataAtom } from '../../recoil/user.recoil';
import { chatNameSpace, ENTERCHANNEL } from '../../socket/event';
import useSocket from '../../socket/useSocket';
import { UserProfileBoxDataType } from '../../types/Profile.type';

const JoinedChatListLayout = styled('div')(({ theme }) => ({
  height: '40%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
}));

const JoinedDMBox = styled('div')(({ theme }) => ({
  marginTop: '6%',
  height: '80%',
  width: '90%',
  borderRadius: '13px',
  background: 'linear-gradient( #f796c088, #76aef177)',
  border: 'none',
}));

const BoxLayout = styled('div')(({ theme }) => ({
  height: '100%',
  marginLeft: '3%',
}));

const UserStateLayout = styled('section')(({ theme }) => ({
  height: '50%',
  width: '40%',
  marginTop: '10%',
  display: 'flex',
  paddingRight: '10%',
}));

// const [isUser, setIsUser] = useRecoilState(IsUser);

function JoinedDMListOrganisms() {
  //채팅 참여자목록의 각 데이터 type형식으로 바꾸어 적용해야 합니다.
  //isblock은 공통사항이긴하지만 컴포넌트의 상태를 나타내는 것들은 한번 컴포넌트를 감싸서 표시해주기로 하였으므로, 기본 값에서 제외시켰습니다.
  const [socket] = useSocket(chatNameSpace);
  const userData = useRecoilValue(userDataAtom);
  const [roomlist, setRoomList] = useRecoilState(DMList);
  const joinedChatList = useRecoilValue(getJoinedChatList(userData.id));
  const navigate = useNavigate();
  const refreshUserInfo = useRecoilRefresher_UNSTABLE(
    getJoinedChatList(userData.id),
  );

  useEffect(() => {
    if (joinedChatList !== null) {
      setRoomList(joinedChatList.dmList);
    }
    return () => {
      //프로필로 나갔다가 다시  들어오면  데이터가 사라지는  현상을 고치기 위해 추가
      refreshUserInfo();
    };
  }, []);

  const listElement: React.ReactElement[] = roomlist.map((room: any) => {
    const profileData: UserProfileBoxDataType = {
      id: room.id,
      nickname: room.name,
      image: room.image,
    };

    const enterRoom = () => {
      socket.emit(
        `${ENTERCHANNEL}`,
        {
          userId: userData.id,
          roomId: room.id,
          salt: '',
        },
        (response: any) => {
          navigate(`/pingpong/channel/room/${room.id}`);
        },
      );
    };

    const userProfileBoxProps = {
      isButton: true,
      avatarType: 'none',
      userData: profileData,
      action: enterRoom,
    };
    return (
      <ListLayout key={room.id}>
        <UserStateLayout>
          {/* 유저프로필에서도 볼 수 있고, 디자인적으로 좋지 않아 삭제 */}
          {/* {room.blocked === BLOCK && (
            <BlockBadge>
              <BlockCloss />
            </BlockBadge>
          )} */}
          <UserProfileBox userProfileBoxProps={userProfileBoxProps} />
        </UserStateLayout>
      </ListLayout>
    );
  });

  return (
    <JoinedChatListLayout>
      {/* [axios GET 요청] 현재 개설된 DM 리스트 요청 */}
      <JoinedDMBox>
        {/* [axios GET 요청] DM 리스트 불러오기 */}
        {/* [Socket IO 요청]
                - Socket.emit으로 로그인 상태 보냄
                - Socket.on으로  DM유저 로그인 상태 받음
                   */}
        <BoxLayout>
          <ListGenerateLayout>
            <ListUlLayout>{listElement}</ListUlLayout>
          </ListGenerateLayout>
        </BoxLayout>
      </JoinedDMBox>
    </JoinedChatListLayout>
  );
}

export default JoinedDMListOrganisms;
