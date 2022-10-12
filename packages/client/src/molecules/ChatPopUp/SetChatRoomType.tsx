import { Input, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import RadioGroupButton from '../../atoms/radio/RadioGroupButton';
import { PUBLIC } from '../../configs/RoomType';

/*
 * AsideSearchBox로 감싼 이유는
 * 공통적으로 사용하는 searchBox가 상위 레이아웃에 기반하여 모양을 잡기 때문
 * 예) 상위 레이아웃이 w: 50px에 h: 40px 이면 search box도 마찬가지 크기가 됨.
 */
const SetTypeLayout = styled('div')(({ theme }) => ({
  width: '90%',
  height: '10%',
  backgroundColor: '#7B61FF66',
  borderRadius: '10px',
  marginBottom: '1%',
}));

const RadilButtonLayout = styled('div')(({ theme }) => ({
  paddingRight: '5%',
  paddingLeft: '25%',
}));

function SetChatRoomTypeModule(handler: { handler: (value: number) => void }) {
  const handleType = handler.handler;

  return (
    <SetTypeLayout>
      <Typography marginLeft="3%" variant="h5">
        채팅방 설정
      </Typography>
      <RadilButtonLayout>
        <RadioGroupButton first="1" second="2" third="3" handler={handleType} />
      </RadilButtonLayout>
    </SetTypeLayout>
  );
}

export default SetChatRoomTypeModule;
