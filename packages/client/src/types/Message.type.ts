import { GetRoomInfoDto } from './Room.type';
import { BaseUserProfileData } from './Profile.type';

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

export interface ClientAcceptGameDto {
  hostId: number;
  mode: number;
}

export interface ServerAcceptGameDto {
  title: string; // 게임 네임스페이스 연결 후, 둘을 식별하기 위한 roomID
  mode: number;
}

export interface CheckFriendDto {
  isFriend: boolean;
}

// export interface InviteMessageListType {
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

export interface InviteInfoListType {
  id?: number; //친구 초대시 필요 정보
  userId: number;
  message: string;
  type: string;
  mode?: number; //게임 초대시 필요 정보
}

// export interface InviteMessagesListType {
//   list: InviteInfoListType[]
// }

export interface RequestDto {
  id: number;
  requestor: BaseUserProfileData;
  responser: BaseUserProfileData; // 필요하진 않을 수 있음
}
