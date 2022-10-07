import { styled } from '@mui/material/styles';
import CustomIconButton from 'client/src/atoms/button/icon/CustomIconButtion';
import BlockIcon from '@mui/icons-material/Block';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import PersonIcon from '@mui/icons-material/Person';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PasswordInput from 'client/src/atoms/input/passwordBox';
import {
  CustomIconProps,
  LinkIconProps,
  LinkIconResource,
} from 'client/src/types/Link.type';
import LinkPageIconButton from 'client/src/atoms/button/linkPage/LinkPageIconButton';
import {
  CHANNELURL,
  CHATROOMURL,
  GAMECREATEURL,
  OTHERPROFILEURL,
  SERVERURL,
} from 'client/src/configs/Link.url';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { DM } from '../../configs/RoomType';

const InfoBoxFunctionLayout = styled('div')(({ theme }) => ({
  flexDirection: 'row-reverse',
  display: 'flex',
  alignItems: 'center',
  padding: '10%',
}));

const InfoFunctionLayout = styled('div')(({ theme }) => ({
  width: '30%',
  height: '95%',
}));

//향후 상태관리를 추가하여 조건에 따라 아이콘을 보이게 또는 안보이게 처리해줄 것 입니다.

function InfoChatRoomBoxFunctionModule(props: { roomInfo: any }) {
  //[수정사항] 동환님이 유저 작업끝내면 바꿀 것
  const userId = 1;
  const roomInfo = props.roomInfo;
  const navigate = useNavigate();
  const { name, type, image } = roomInfo;
  const { roomId } = useParams();

  async function outRoom() {
    try {
      //[수정사항] 임시로 userid를 1로 지정. doyun님과 소통 후, 변경 예정
      const response = await axios.delete(
        `${SERVERURL}/rooms/${roomId}/channel/participants/${userId}`,
      );
      navigate(`${CHANNELURL}`);
    } catch (error) {
      alert(error);
      throw console.dir(error);
    }
  }

  const customMeetProps: CustomIconProps = {
    icon: <MeetingRoomIcon />,
    action: outRoom,
  };

  const personal: LinkIconResource = {
    url: OTHERPROFILEURL,
    icon: <PersonIcon />,
  };

  const goToGame: LinkIconResource = {
    url: GAMECREATEURL,
    icon: <SportsKabaddiIcon />,
  };

  const customBlockProps: CustomIconProps = {
    icon: <BlockIcon />,
  };

  const personalAction: LinkIconProps = {
    iconResource: personal,
  };

  const gameAction: LinkIconProps = {
    iconResource: goToGame,
  };

  return (
    <InfoFunctionLayout>
      {/* [axios POST 요청]방장이 나갈시, 권한위임 요청 */}
      {/* [axios DELETE 요청]해당 채팅방 나가기 요청 */}
      {type === DM ? (
        <InfoBoxFunctionLayout>
          <CustomIconButton customProps={customBlockProps} />
          <LinkPageIconButton linkIconProps={gameAction} />
          <LinkPageIconButton linkIconProps={personalAction} />
        </InfoBoxFunctionLayout>
      ) : (
        <InfoBoxFunctionLayout>
          <CustomIconButton customProps={customMeetProps} />
        </InfoBoxFunctionLayout>
      )}
    </InfoFunctionLayout>
  );
}

export default InfoChatRoomBoxFunctionModule;
