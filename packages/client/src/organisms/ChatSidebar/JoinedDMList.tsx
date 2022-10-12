import { styled } from '@mui/material/styles';
import { useRecoilState, useRecoilValue } from 'recoil';
import ListGenerate from '../../atoms/list/ListGenerate';
import UserProfileBox from '../../molecules/ProfileSection/UserProfileBox';
import {
  FriendType,
  UserProfileBoxDataType,
  UserProfileBoxType,
} from '../../types/Profile.type';

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
  //isblock은 공통사항이긴하지만 컴포넌트의 상태를 나타내는 것들은 한번 컴포넌트를 감싸서 표시해주기로 하였으므로, 기본 값에서 제외시켰습니다.
  const userData: UserProfileBoxDataType = {
    nickname: 'noname',
    image: 'noimage',
  };

  const userProfileBoxProps = {
    isButton: true,
    avatarType: 'none',
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
