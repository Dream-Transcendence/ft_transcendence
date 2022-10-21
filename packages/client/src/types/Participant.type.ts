export interface ParticipantInfoSet {
  participantInfo: ParticipantInfo[];
  roomId?: string;
  handler: (ParticipantInfo: ParticipantInfo[]) => void;
}

//데이터 이원화 걱정이 되는군
//useRecoilRefresher_UNSTABLE() 사용할까 생각중
export interface ParticipantInfoNState {
  participantInfo: ParticipantInfo;
  participantInfoArray: ParticipantInfo[];
  handler: (participantInfo: ParticipantInfo[]) => void;
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
