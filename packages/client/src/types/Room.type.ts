export interface RoomInfoSet {
  //[수정사항] any => ChannelDto
  //[수정사항] any => DmUserDto
  //[수정사항] any => participantDto
  roomInfo: GetRoomInfoDto;
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

export interface GetRoomInfoDto {
  id: number;
  name: string;
  type: number;
  image: string;
  title: string;
  salt?: string;
  blocked?: boolean;
}
