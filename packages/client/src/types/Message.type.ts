import { GetRoomInfoDto } from './Room.type';
import { ParticipantInfo } from './Participant.type';

export interface ControlMessage {
  blockedUser: number[];
  messages: SocketMessage[];
  setMessages: (Messages: SocketMessage[]) => void;
}

export interface SocketMessage {
  body: string;
  id: number;
  user: {
    id: number;
    image: string;
    nickname: string;
  };
}

export interface SendMessage {
  userId: number;
  roomId: number;
  body: string;
}

export interface ControlRoomInfo {
  roomInfo: GetRoomInfoDto;
  controlMessage: ControlMessage;
}

// export interface InviteMassageListType {
//   id: number,
//   requestor: {
//     id: number,
//     nickname: string,
//     image: string,
//   },
//   responser: {
//     id: number,
//     nickname: string,
//     image: string,
//   }
// }

export interface InviteMassageListType {
  id?: number,
  massage: string,
  type: string,
  mode?: number,
}