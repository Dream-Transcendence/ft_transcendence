import { styled } from '@mui/material/styles';
import ChatInputModule from '../../molecules/ChatSection/ChatInput';
import ChatLogListOrganisms from './ChatLogList';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SERVERURL } from '../../configs/Link.url';
import { useRecoilValue } from 'recoil';
import { userStatus } from '../../recoil/chat.recoil';
import { MUTE } from '../../configs/Status.case';
import { ControlMessage, SocketMessage } from '../../types/Message.type';
import { GetRoomInfoDto } from '../../types/Room.type';
import { DM } from '../../configs/RoomType';

const DMChattingLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '99%',
  display: 'flex',
  flexDirection: 'column',
}));

const RoomChattingLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '99%',
  display: 'flex',
  flexDirection: 'column',
}));

const ChattingLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '99%',
}));
// prop 변수를 안넣어주니  has no properties in common with type 'IntrinsicAttributes'. 라는 에러발생
function ChattingOrganisms(props: { roomInfo: GetRoomInfoDto }) {
  const { type } = props.roomInfo;
  const { roomId } = useParams();
  const userState = useRecoilValue(userStatus);
  const [MessageHistory, setMessageHistory] = useState<SocketMessage[]>([]);
  const messageSetter: ControlMessage = {
    messages: MessageHistory,
    setMessages: setMessageHistory,
  };

  useEffect(() => {
    setMessageHistory([]);
    return setMessageHistory([]);
  }, [roomId, setMessageHistory]);
  // console.log('데이터 받아오기 전', messageSetter.messages);

  return (
    <ChattingLayout>
      {type === DM ? (
        <DMChattingLayout>
          <ChatLogListOrganisms messageSetter={messageSetter} />
          {userState !== MUTE && (
            <ChatInputModule messageSetter={messageSetter} />
          )}
        </DMChattingLayout>
      ) : (
        <RoomChattingLayout>
          <ChatLogListOrganisms messageSetter={messageSetter} />
          {userState !== MUTE && (
            <ChatInputModule messageSetter={messageSetter} />
          )}
        </RoomChattingLayout>
      )}
    </ChattingLayout>
  );
}

export default ChattingOrganisms;
