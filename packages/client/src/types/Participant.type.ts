export interface ParticipantInfoSet {
  //[수정사항] any => ChannelParticipantDto
  participantInfo: any[];
  roomId?: string;
  handler?: (ParticipantInfo: any) => void;
}
