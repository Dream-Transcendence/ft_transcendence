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
import {
  ControlMessage,
  ControlRoomInfo,
  SocketMessage,
} from '../../types/Message.type';
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
  width: '70%',
  height: '98%',
}));

const BlockLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'right',
  alignItems: 'center',
}));

const BlockSpan = styled('span')(({ theme }) => ({
  fontSize: '6.2em',
  color: '#432455',
  marginBottom: '10%',
  textShadow: '#FC0 1px 0 10px',
}));

// prop 변수를 안넣어주니  has no properties in common with type 'IntrinsicAttributes'. 라는 에러발생
function ChattingOrganisms(props: { controlRoomInfo: ControlRoomInfo }) {
  const { roomInfo, controlMessage } = props.controlRoomInfo;
  const { setMessages: setMessageHistory } = controlMessage;
  const { type } = roomInfo;
  const { roomId } = useParams();
  const userState = useRecoilValue(userStatus);

  useEffect(() => {
    setMessageHistory([]);
    return setMessageHistory([]);
  }, [roomId, setMessageHistory]);

  return (
    //type에 따라 방 사이즈변경하려고 레이아웃을 나눔 하지만 지금은 적용안됨.
    <ChattingLayout>
      {type === DM ? (
        roomInfo.blocked === false ? (
          <DMChattingLayout>
            <ChatLogListOrganisms messageSetter={controlMessage} />
            <ChatInputModule messageSetter={controlMessage} />
          </DMChattingLayout>
        ) : (
          <BlockLayout>
            <BlockSpan>BLOCK</BlockSpan>
          </BlockLayout>
        )
      ) : (
        <RoomChattingLayout>
          <ChatLogListOrganisms messageSetter={controlMessage} />
          {userState !== MUTE && (
            <ChatInputModule messageSetter={controlMessage} />
          )}
        </RoomChattingLayout>
      )}
    </ChattingLayout>
  );
}

export default ChattingOrganisms;
