import { Input, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchBox from '../../components/input/SearchBox';

/*
 * AsideSearchBox로 감싼 이유는
 * 공통적으로 사용하는 searchBox가 상위 레이아웃에 기반하여 모양을 잡기 때문
 * 예) 상위 레이아웃이 w: 50px에 h: 40px 이면 search box도 마찬가지 크기가 됨.
 */
const SetNameLayout = styled('div')(({ theme }) => ({
  width: '90%',
  height: '15%',
  backgroundColor: '#7B61FF66',
  borderRadius: '10px',
  marginBottom: '1%',
}));

const NameInputStyle = {
  marginLeft: '3%',
};

function SetChatRoomNameModule() {
  return (
    <SetNameLayout>
      <Typography margin="3%" variant="h5">
        채팅방 이름
      </Typography>
      <Input placeholder="방 이름을 입력하세요" style={NameInputStyle}></Input>
    </SetNameLayout>
  );
}

export default SetChatRoomNameModule;
