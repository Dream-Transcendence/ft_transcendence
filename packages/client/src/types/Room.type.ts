import { BaseUserProfileData } from './Profile.type';

export interface RoomInfoSet {
  roomInfo: GetRoomInfoDto;
  roomId?: string;
  handler?: (roomInfo: GetRoomInfoDto) => void;
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
  blocked?: boolean;
  recvMessageCount: number;
}

export interface HandleInviteList {
  handleParticipant: (numList: number[]) => void;
  newParticipantList: BaseUserProfileData[];
  setNewParticipantList: (numList: BaseUserProfileData[]) => void;
}

export interface HandlePassword {
  handlePassword: (childData: string) => void;
  handleChangePassword?: () => void;
}

export interface UnJoinedRoomList {
  id: number;
  name: string;
  type: number;
  title: string;
  image: string;
  personnel: number;
}

export interface GetRoomInfoDto {
  id: number;
  userId?: number;
  name: string;
  type: number;
  image: string;
  title: string;
  personnel: number;
  salt?: string;
  blocked?: boolean;
  auth: number | null;
  status: number | null;
}
