import io, { Socket } from 'socket.io-client';
import { useCallback, useEffect } from 'react';
import { SOCKETURL } from '../configs/Link.url';
import { DefaultEventsMap } from '@socket.io/component-emitter';
const sockets: { [key: string]: Socket<DefaultEventsMap, DefaultEventsMap> } =
  {};

const useSocket = (
  nameSpace: string,
): [Socket<DefaultEventsMap, DefaultEventsMap>, () => void, () => void] => {
  //transport로 폴링을 막아주면 초기 emit이 두번씩
  if (!sockets[nameSpace]) {
    sockets[nameSpace] = io(`${SOCKETURL}/${nameSpace}`, {
      autoConnect: false,
      // transports: ['websocket'],
    });
    console.log('socket object!: ', sockets[nameSpace]);
  }

  // if (sockets[nameSpace].connected) {
  // sockets[nameSpace].onAny((event, ...args) => {
  //   console.log(event, args);
  // });
  // }

  // const auth = () => {
  //   sockets[nameSpace].connect();
  // };
  // console.log( sockets[nameSpace]);
  const connect = () => {
    //undefined를 체크한 이유는 가끔가다가 socket생성이 느려서 터짐!
    if (sockets[nameSpace] !== undefined &&
      sockets[nameSpace].connected === false
    ) {
      sockets[nameSpace].connect();
      console.log(
        `sockets[${nameSpace}].connected`,
        sockets[nameSpace].connected,
      );
    }
  };

  const disconnect = () => {
    if (sockets[nameSpace] !== undefined &&
      sockets[nameSpace].connected === true
      ) {

      sockets[nameSpace].disconnect();
      console.log(
        `sockets[${nameSpace}].disconnected`,
        sockets[nameSpace].connected,
      );
      delete sockets[nameSpace];
    }
  };

  return [sockets[nameSpace], connect, disconnect];
};

export default useSocket;
