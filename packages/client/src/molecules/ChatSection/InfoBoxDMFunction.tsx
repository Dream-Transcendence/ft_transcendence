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
  GAMECREATEURL,
  OTHERPROFILEURL,
  SERVERURL,
} from 'client/src/configs/Link.url';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const InfoBoxFunctionLayout = styled('div')(({ theme }) => ({
  width: '80%',
  height: '95%',
  flexDirection: 'row-reverse',
  display: 'flex',
  alignItems: 'center',
}));

//향후 상태관리를 추가하여 조건에 따라 아이콘을 보이게 또는 안보이게 처리해줄 것 입니다.
//[수정사항] any => ChannelDto
function InfoDMBoxFunctionModule() {
  //[수정사항] 동환님이 유저 작업끝내면 바꿀 것
  const { roomId } = useParams();
  //[수정사항] any => DmUserDto
  const [DMInfo, setDMInfo] = useState<any>({});
  const userId = 1;

  useEffect(() => {
    async function getDMInfo() {
      try {
        //[수정사항] 임시로 userid를 1로 지정. doyun님과 소통 후, 변경 예정
        const response = await axios.get(
          `${SERVERURL}/rooms/${roomId}/dm/${userId}/participants`,
        );
        setDMInfo(response.data);
      } catch (error) {
        alert(error);
        throw console.dir(error);
      }
    }
    getDMInfo();
  }, [roomId]);

  console.log(DMInfo);

  async function blockUser() {
    try {
      //[수정사항] 임시로 userid를 1로 지정. doyun님과 소통 후, 변경 예정
      await axios.post(`${SERVERURL}/users/${userId}/blocks`, {
        id: DMInfo.id,
      });
      console.log('block!!');
    } catch (error) {
      alert(error);
      throw console.dir(error);
    }
  }

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
    action: blockUser,
  };

  const personalAction: LinkIconProps = {
    iconResource: personal,
  };

  const gameAction: LinkIconProps = {
    iconResource: goToGame,
  };

  return (
    <InfoBoxFunctionLayout>
      <CustomIconButton customProps={customBlockProps} />
      <LinkPageIconButton linkIconProps={gameAction} />
      <LinkPageIconButton linkIconProps={personalAction} />
    </InfoBoxFunctionLayout>
  );
}

export default InfoDMBoxFunctionModule;
