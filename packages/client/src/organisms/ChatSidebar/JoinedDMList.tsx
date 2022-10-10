import { styled } from '@mui/material/styles';
import { useRecoilState, useRecoilValue } from 'recoil';
import ListGenerate from '../../atoms/list/ListGenerate';
import UserProfileBox from '../../molecules/ProfileSection/UserProfileBox';
import { FriendType, UserProfileBoxType } from '../../types/Profile.type';

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
  backgroundColor: '#001D7D',
}));

// const [isUser, setIsUser] = useRecoilState(IsUser);

function JoinedDMListOrganisms() {
  //채팅 참여자목록의 각 데이터 type형식으로 바꾸어 적용해야 합니다.
  const userData: FriendType = {
    id: 0,
    user: {
      id: 0,
      nickname: 'noname',
      image: 'noimage',
    },
    isBlocked: false,
  };

  const userProfileBoxProps = {
    isButton: true,
    avatarType: 'circle',
    userData: userData,
    // action?: () => void;
  };
  return (
    <JoinedChatListLayout>
      {/* [axios GET 요청] 현재 개설된 DM 리스트 요청 */}
      <JoinedDMBox>
        {/* [axios GET 요청] DM 리스트 불러오기 */}
        {/* [Socket IO 요청]
                - Socket.emit으로 로그인 상태 보냄
                - Socket.on으로  DM유저 로그인 상태 받음
                   */}
        <ListGenerate element={UserProfileBox({ userProfileBoxProps })} />
      </JoinedDMBox>
    </JoinedChatListLayout>
  );
}

export default JoinedDMListOrganisms;
