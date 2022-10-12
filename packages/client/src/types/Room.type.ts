export interface RoomInfoSet {
  //[수정사항] any => ChannelDto
  //[수정사항] any => DmUserDto
  roomInfo: any;
  DMInfo: any;
  roomId?: string;
  handler?: (roomInfo: any) => void;
}

export interface CreateRoomHandlerSet {
  savehandler: () => void;
  closehandler: () => void;
}

export interface CreateRoomSet {
  userId: number;
  name: string;
  type: number;
  salt: string;
  participantIds: number[];
}

export interface RoomList {
  id: number;
  name: string;
  image: string;
  recvMessageCount: number;
}
