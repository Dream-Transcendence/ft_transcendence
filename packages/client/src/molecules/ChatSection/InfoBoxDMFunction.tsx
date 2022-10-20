import { styled } from '@mui/material/styles';
import BlockIcon from '@mui/icons-material/Block';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import PersonIcon from '@mui/icons-material/Person';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { GAMECREATEURL, PROFILEURL, SERVERURL } from '../../configs/Link.url';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LinkPageIconButton from '../../atoms/button/linkPage/LinkPageIconButton';
import {
  CustomIconProps,
  LinkIconProps,
  LinkIconResource,
} from '../../types/Link.type';
import CustomIconButton from '../../atoms/button/icon/CustomIconButtion';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userDataAtom } from '../../pages/PingpongRoutePage';
import { DMList, userAuth } from '../../recoil/chat.recoil';
import { GetRoomInfoDto, RoomInfoSet } from '../../types/Room.type';
import { BLOCK, UNBLOCK } from '../../configs/Block.case';

const InfoBoxFunctionLayout = styled('div')(({ theme }) => ({
  width: '80%',
  height: '95%',
  flexDirection: 'row-reverse',
  display: 'flex',
  alignItems: 'center',
}));

export async function blockUser(
  blockId: number,
  userId: number,
  setBlock: () => void,
) {
  try {
    //[수정사항] 임시로 userid를 1로 지정. doyun님과 소통 후, 변경 예정
    await axios.post(`${SERVERURL}/users/${userId}/blocks`, {
      id: blockId,
    });
    console.log('block!!');
    setBlock();
  } catch (error) {
    alert(error);
    throw console.dir(error);
  }
}

export async function unBlockUser(
  blockId: number,
  userId: number,
  setUnBlock: () => void,
) {
  try {
    //[수정사항] 임시로 userid를 1로 지정. doyun님과 소통 후, 변경 예정
    await axios.delete(`${SERVERURL}/users/${userId}/blocks/${blockId}`);
    console.log('unblock!!');
    setUnBlock();
  } catch (error) {
    alert(error);
    throw console.dir(error);
  }
}

//향후 상태관리를 추가하여 조건에 따라 아이콘을 보이게 또는 안보이게 처리해줄 것 입니다.
//[수정사항] any => ChannelDto
function InfoDMBoxFunctionModule(props: { roomInfoSet: RoomInfoSet }) {
  const roomInfoSet = props.roomInfoSet;
  const userData = useRecoilValue(userDataAtom);
  const { roomInfo, handler } = roomInfoSet;
  const [roomlist, setRoomList] = useRecoilState(DMList);
  const findRoom = roomlist.find((room) => {
    return room.name === roomInfo.name;
  });
  const popUserList = roomlist.filter((room) => {
    return room.name !== roomInfo.name;
  });
  //cons
  //[수정사항] 동환님이 유저 작업끝내면 바꿀 것

  const setBlock = () => {
    const block = { ...roomInfo, blocked: true };
    if (findRoom !== undefined) {
      const blockedUser = { ...findRoom, blocked: true };
      setRoomList([...popUserList, blockedUser]);
    }
    if (handler !== undefined) handler(block);
  };
  const setUnBlock = () => {
    const unBlock = { ...roomInfo, blocked: false };
    if (findRoom !== undefined) {
      const blockedUser = { ...findRoom, blocked: false };
      setRoomList([...popUserList, blockedUser]);
    }
    if (handler !== undefined) handler(unBlock);
  };
  function handlerBlock() {
    //[수정요망] 나 block id roominfo에서 userid를 받아와야함
    // roomInfo.id => roomInfo.userId
    alert('roomInfo.id => roomInfo.userId');
    // if (roomInfo.blocked === UNBLOCK)
    //   blockUser(roomInfo.id, userData.id, setBlock);
    // else if (roomInfo.blocked === BLOCK)
    //   unBlockUser(roomInfo.id, userData.id, setUnBlock);
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
