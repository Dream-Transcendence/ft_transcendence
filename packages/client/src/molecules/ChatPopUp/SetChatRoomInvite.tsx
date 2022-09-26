import { Input, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchBox from '../../atoms/input/SearchBox';
import ListGenerate from '../../atoms/list/ListGenerate';
import UserProfileBox from '../ProfileSection/UserProfileBox';
import UserInviteProfileBox from '../ProfileSection/UserInviteBox';

/*
 * AsideSearchBox로 감싼 이유는
 * 공통적으로 사용하는 searchBox가 상위 레이아웃에 기반하여 모양을 잡기 때문
 * 예) 상위 레이아웃이 w: 50px에 h: 40px 이면 search box도 마찬가지 크기가 됨.
 */
const SetInviteLayout = styled('div')(({ theme }) => ({
  width: '90%',
  height: '35%',
  backgroundColor: '#7B61FF66',
  borderRadius: '10px',
  marginBottom: '3%',
}));

const SearchBoxLayout = styled('div')(({ theme }) => ({
  width: '80%',
  height: '12%',
  marginLeft: '9.5%',
}));

const InvitedListLayout = styled('section')(({ theme }) => ({
  width: '80%',
  height: '65%',
  marginLeft: '9.5%',
  overflow: 'auto',
}));

function SetChatRoomInviteModule() {
  return (
    <SetInviteLayout>
      <Typography margin="3%" variant="h5">
        채팅방 초대
      </Typography>
      <SearchBoxLayout>
        <SearchBox />
      </SearchBoxLayout>
      <InvitedListLayout>
        {ListGenerate(<UserInviteProfileBox />)}
      </InvitedListLayout>
    </SetInviteLayout>
  );
}

export default SetChatRoomInviteModule;
