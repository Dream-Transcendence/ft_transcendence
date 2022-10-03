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
import { PROFILEURL } from '../../configs/Link.url';

const InfoBoxFunctionLayout = styled('div')(({ theme }) => ({
  width: '30%',
  height: '95%',
  flexDirection: 'row-reverse',
  display: 'flex',
  alignItems: 'center',
}));
//향후 상태관리를 추가하여 조건에 따라 아이콘을 보이게 또는 안보이게 처리해줄 것 입니다.
function InfoDMBoxFunctionModule() {
  const personal: LinkIconResource = {
    url: PROFILEURL,
    icon: <PersonIcon />,
  };

  const customBlockProps: CustomIconProps = {
    icon: <BlockIcon />,
  };

  const customSportProps: CustomIconProps = {
    icon: <SportsKabaddiIcon />,
  };

  const personalAction: LinkIconProps = {
    iconResource: personal,
  };

  return (
    <InfoBoxFunctionLayout>
      {/* [axios POST 요청] 상대방을 차단 혹은 차단해제가능 */}
      {/* 차단 유무에 따라 아이콘을 다르게 줄 예정 */}
      <CustomIconButton customProps={customBlockProps} />
      {/* [axios POST 요청] 1 대 1 게임 큐에 등록 요청 */}
      <CustomIconButton customProps={customSportProps} />
      <LinkPageIconButton linkIconProps={personalAction} />
    </InfoBoxFunctionLayout>
  );
}

export default InfoDMBoxFunctionModule;
