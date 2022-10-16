export interface ParticipantInfoSet {
  //[수정사항] any => ChannelParticipantDto
  participantInfo: ParticipantInfo[];
  roomId?: string;
  handler: (ParticipantInfo: ParticipantInfo[]) => void;
}

//데이터 이원화 걱정이 되는군
//useRecoilRefresher_UNSTABLE() 사용할까 생각중
export interface ParticipantInfoNState {
  //[수정사항] any => ChannelParticipantDto
  participantInfo: ParticipantInfo;
  participantInfoArray: ParticipantInfo[];
  handler: (participantInfo: ParticipantInfo[]) => void;
  // isAdmin: boolean;
  // setIsAdmin: (admin: boolean) => void;
  // isMute: boolean;
  // setIsMute: (mute: boolean) => void;
  // AdminSetter?: (ParticipantInfo: ParticipantInfo) => void;
}

export interface ParticipantInfo {
  user: {
    id: number;
    nickname: string;
    image: string;
  };
  auth: number | null;
  status: number;
  blocked: boolean;
}

export interface ChangeParticipantInfo {
  userId: number;
  roomId: number;
  auth: number | null;
  status: number | null;
}
