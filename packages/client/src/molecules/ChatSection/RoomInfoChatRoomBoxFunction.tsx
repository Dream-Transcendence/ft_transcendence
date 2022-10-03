import { styled } from '@mui/material/styles';
import CustomIconButton from 'client/src/atoms/button/icon/CustomIconButtion';
import BlockIcon from '@mui/icons-material/Block';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import PersonIcon from '@mui/icons-material/Person';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PasswordInput from 'client/src/atoms/input/passwordBox';
import { CustomIconProps, LinkIconResource } from 'client/src/types/Link.type';
import LinkPageIconButton from 'client/src/atoms/button/linkPage/LinkPageIconButton';
import { OTHERPROFILEURL } from 'client/src/configs/Link.url';

const InfoBoxFunctionLayout = styled('div')(({ theme }) => ({
  width: '30%',
  height: '95%',
  flexDirection: 'row-reverse',
  display: 'flex',
  alignItems: 'center',
}));
//향후 상태관리를 추가하여 조건에 따라 아이콘을 보이게 또는 안보이게 처리해줄 것 입니다.
function InfoChatRoomBoxFunctionModule() {
  const customMeetProps: CustomIconProps = {
    icon: <MeetingRoomIcon />,
  };
  return (
    <InfoBoxFunctionLayout>
      {/* [axios POST 요청]방장이 나갈시, 권한위임 요청 */}
      {/* [axios DELETE 요청]해당 채팅방 나가기 요청 */}
      <CustomIconButton customProps={customMeetProps} />
    </InfoBoxFunctionLayout>
  );
}

export default InfoChatRoomBoxFunctionModule;
