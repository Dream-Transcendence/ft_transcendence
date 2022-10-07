import { styled } from '@mui/material/styles';
import CustomIconButton from '../../atoms/button/icon/CustomIconButtion';
import InfoBoxFunctionModule from 'client/src/molecules/ChatSection/RoomInfoBoxFunction';
import InfoEditBoxNameModule from '../../molecules/ChatSection/RoomInfoBoxName';
import InfoBoxPasswordModule from '../../molecules/ChatSection/RoomInfoBoxPassword';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SERVERURL } from '../../configs/Link.url';
import axios from 'axios';
import { RoomInfoSet } from '../../types/Room.type';

const RoomInfoLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '11%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const RoomInfoBox = styled('div')(({ theme }) => ({
  width: '93%',
  height: '80%',
  display: 'flex',
  marginRight: '1%',
  borderRadius: '15px',
  backgroundColor: '#003566',
}));

//[수정사항] any => ChannelDto
/*
 * 채팅정보를 수정하기 위한 공통 커스텀 훅
 */
//[수정사항] 비밀번호 변경 성공, 향후 손캉님이 공백 보낼 때, type변경해주는 로직 고쳐주면 아이콘 자동변환되게 바꿀 것
export const ChangeRoomInfo = async (roomInfoSet: RoomInfoSet) => {
  try {
    const { roomInfo, roomId } = roomInfoSet;
    console.log(roomInfo);
    const response = await axios.patch(
      `${SERVERURL}/rooms/${roomId}`,
      roomInfo,
    );
    return await response.data;
  } catch (error) {
    alert(error);
    throw await console.dir(error);
  }
};

//[수정사항] any => ChannelDto
function EnteredChatRoomInfoOrganisms(props: { roomInfoSet: RoomInfoSet }) {
  const roomInfoSet = props.roomInfoSet;
  const { roomInfo } = roomInfoSet;

  return (
    <RoomInfoLayout>
      <RoomInfoBox>
        {/* [axios GET 요청]해당 채팅방 정보 요청 내부에서 나눠 받을지, 한꺼번에 받을지 고민중 */}
        <InfoEditBoxNameModule roomInfoSet={roomInfoSet} />
        <InfoBoxPasswordModule roomInfoSet={roomInfoSet} />
        <InfoBoxFunctionModule roomInfo={roomInfo} />
      </RoomInfoBox>
    </RoomInfoLayout>
  );
}

export default EnteredChatRoomInfoOrganisms;
