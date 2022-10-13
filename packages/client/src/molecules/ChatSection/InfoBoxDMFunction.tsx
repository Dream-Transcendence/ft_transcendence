import { styled } from '@mui/material/styles';
import BlockIcon from '@mui/icons-material/Block';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import PersonIcon from '@mui/icons-material/Person';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { GAMECREATEURL, PROFILEURL, SERVERURL } from '../../configs/Link.url';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userDataAtom } from '../../pages/PingpongRoutePage';
import CustomIconButton from '../../atoms/button/icon/CustomIconButtion';
import {
  CustomIconProps,
  LinkIconProps,
  LinkIconResource,
} from '../../types/Link.type';
import LinkPageIconButton from '../../atoms/button/linkPage/LinkPageIconButton';

const InfoBoxFunctionLayout = styled('div')(({ theme }) => ({
  width: '80%',
  height: '95%',
  flexDirection: 'row-reverse',
  display: 'flex',
  alignItems: 'center',
}));

export async function blockUser(blockId: number, userId: number) {
  try {
    //[수정사항] 임시로 userid를 1로 지정. doyun님과 소통 후, 변경 예정
    await axios.post(`${SERVERURL}/users/${userId}/blocks`, {
      id: blockId,
    });
    console.log('block!!');
  } catch (error) {
    alert(error);
    throw console.dir(error);
  }
}

//향후 상태관리를 추가하여 조건에 따라 아이콘을 보이게 또는 안보이게 처리해줄 것 입니다.
//[수정사항] any => ChannelDto
function InfoDMBoxFunctionModule(props: { roomInfo: any }) {
  const userData = useRecoilValue(userDataAtom);
  const roomInfo = props.roomInfo;
  //[수정사항] 동환님이 유저 작업끝내면 바꿀 것

  function handlerBlock() {
    blockUser(roomInfo.id, userData.id);
  }

  const personal: LinkIconResource = {
    url: PROFILEURL,
    icon: <PersonIcon />,
  };

  const goToGame: LinkIconResource = {
    url: GAMECREATEURL,
    icon: <SportsKabaddiIcon />,
  };

  const customBlockProps: CustomIconProps = {
    icon: <BlockIcon />,
    action: handlerBlock,
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
