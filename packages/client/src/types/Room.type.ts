export interface RoomInfoSet {
  //[수정사항] any => ChannelDto
  //[수정사항] any => DmUserDto
  roomInfo: any;
  DMInfo: any;
  roomId?: string;
  handler?: (roomInfo: any) => void;
}
