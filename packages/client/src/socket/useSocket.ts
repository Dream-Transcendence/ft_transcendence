import io, { Socket } from 'socket.io-client';
import { useCallback } from 'react';
import { SOCKETURL } from '../configs/Link.url';
import { DefaultEventsMap } from '@socket.io/component-emitter';

const sockets: { [key: string]: Socket<DefaultEventsMap, DefaultEventsMap> } =
  {};

export const useSocket = (
  nameSpace: string,
): [Socket<DefaultEventsMap, DefaultEventsMap>, () => void, () => void] => {
  if (!sockets[nameSpace]) {
    console.log('rerender', nameSpace);
    sockets[nameSpace] = io(`${SOCKETURL}/${nameSpace}`, {
      autoConnect: false,
      // transports: ['websocket'],
    });
  }

  if (sockets[nameSpace].connected) {
    sockets[nameSpace].onAny((event, ...args) => {
      console.log(event, args);
    });
  }

  // const auth = () => {
  //   sockets[nameSpace].connect();
  // };

  const connect = () => {
    sockets[nameSpace].connect();
  };

  const disconnect = () => {
    sockets[nameSpace].disconnect();
    delete sockets[nameSpace];
  };

  return [sockets[nameSpace], connect, disconnect];
};

export default useSocket;
