import { styled } from '@mui/material/styles';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import PersonIcon from '@mui/icons-material/Person';
import { GAMECREATEURL, PROFILEURL } from '../../configs/Link.url';
import axios from 'axios';
import LinkPageIconButton from '../../atoms/button/linkPage/LinkPageIconButton';
import {
  CustomIconProps,
  LinkIconProps,
  LinkIconResource,
} from '../../types/Link.type';
import CustomIconButton from '../../atoms/button/icon/CustomIconButtion';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { RoomInfoSet } from '../../types/Room.type';
import { gameTypeAtom, userDataAtom } from '../../recoil/user.recoil';
import { gameInviteInfoAtom } from '../../recoil/game.recoil';
import { GameInviteInfoType } from '../../types/Game.type';
import { useNavigate } from 'react-router-dom';
import { CUSTOM } from '../../configs/Game.type';

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
  setBlock?: () => void,
) {
  try {
    await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/users/${userId}/blocks`,
      {
        id: blockId,
      },
    );
    if (setBlock) setBlock();
  } catch (error) {
    alert(error);
  }
}

export async function unBlockUser(
  blockId: number,
  userId: number,
  setUnBlock?: () => void,
) {
  try {
    await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/users/${userId}/blocks/${blockId}`,
    );
    if (setUnBlock) setUnBlock();
  } catch (error) {
    alert(error);
  }
}

function InfoDMBoxFunctionModule(props: { roomInfoSet: RoomInfoSet }) {
  const roomInfoSet = props.roomInfoSet;
  const navigate = useNavigate();
  const userData = useRecoilValue(userDataAtom);
  const { roomInfo } = roomInfoSet;
  const [gameInviteInfo, setGameInviteInfo] =
    useRecoilState<GameInviteInfoType>(gameInviteInfoAtom);
  const setGameType = useSetRecoilState(gameTypeAtom);

  // const setBlock = () => {
  //   const block = { ...roomInfo, blocked: true };
  //   if (findRoom !== undefined) {
  //     const blockedUser = { ...findRoom, blocked: true };
  //     setRoomList([...popUserList, blockedUser]);
  //   }
  //   if (handler !== undefined) handler(block);
  // };
  // const setUnBlock = () => {
  //   const unBlock = { ...roomInfo, blocked: false };
  //   if (findRoom !== undefined) {
  //     const blockedUser = { ...findRoom, blocked: false };
  //     setRoomList([...popUserList, blockedUser]);
  //   }
  //   if (handler !== undefined) handler(unBlock);
  // };
  // function handlerBlock() {
  //   //[수정요망] 나 block id roominfo에서 userid를 받아와야함
  //   // roomInfo.id => roomInfo.userId
  //   if (roomInfo.userId !== undefined && roomInfo.blocked === UNBLOCK)
  //     blockUser(roomInfo.userId, userData.id, setBlock);
  //   else if (roomInfo.userId !== undefined && roomInfo.blocked === BLOCK)
  //     unBlockUser(roomInfo.userId, userData.id, setUnBlock);
  // }

  function handleMatch() {
    if (roomInfo.userId) {
      //상대방 id 추가
      setGameType(CUSTOM);
      setGameInviteInfo({
        ...gameInviteInfo,
        hostId: userData.id,
        opponentId: roomInfo.userId,
      });
      navigate(GAMECREATEURL);
    }
  }

  const personal: LinkIconResource = {
    url: PROFILEURL,
    icon: <PersonIcon />,
  };

  const gameAction: CustomIconProps = {
    icon: <SportsKabaddiIcon />,
    action: handleMatch,
  };

  // const customBlockProps: CustomIconProps = {
  //   icon: <BlockIcon />,
  //   action: handlerBlock,
  // };

  const personalAction: LinkIconProps = {
    iconResource: personal,
  };

  return (
    <InfoBoxFunctionLayout>
      {/* <CustomIconButton customProps={customBlockProps} /> */}
      <CustomIconButton customProps={gameAction} />
      <LinkPageIconButton linkIconProps={personalAction} />
    </InfoBoxFunctionLayout>
  );
}

export default InfoDMBoxFunctionModule;
