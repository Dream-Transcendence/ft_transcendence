export interface RoomInfoSet {
  //[수정사항] any => ChannelDto
  roomInfo: any;
  roomId?: string;
  handler?: (roomInfo: any) => void;
}
