export interface ParticipantInfoSet {
  //[수정사항] any => ChannelParticipantDto
  participantInfo: ParticipantInfo[];
  roomId?: string;
  handler?: (ParticipantInfo: any) => void;
}
export interface ParticipantInfo {
  user: {
    id: number;
    nickname: string;
    image: string;
  };
  auth: number;
  status: number;
  blocked: boolean;
}
