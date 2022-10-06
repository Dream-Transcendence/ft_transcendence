export interface MakeRoom {
  //[수정사항] DTO 확정되면 수정할 것 any => ChannelDto[]
  roomList: any[];
  handler: (props: string) => void;
}

export interface RoomInfo {
  //[수정사항] DTO 확정되면 수정할 것 any => ChannelDto
  roomInfo: any;
  handler: (props: string) => void;
}
