export interface UserLadderType {
  rank: number;
  winCount: number;
  loseCount: number;
}

export interface UserProfileBoxDataType {
  id?: number;
  nickname: string;
  image: string;
}

export interface UserProfileBoxType {
  isButton: boolean;
  avatarType: string;
  userData: UserProfileBoxDataType;
  action?: () => void;
}

export interface UserMatchHistoryType {
  id: number;
  user: {
    id: number;
    nickname: string;
    image: string;
  };
  opponent: {
    id: number;
    nickname: string;
    image: string;
  };
  isWin: boolean;
  isLadder: boolean;
}

export interface FriendType {
  id: number;
  user: {
    id: number;
    nickname: string;
    image: string;
  };
  isBlocked: boolean;
}

export interface BaseUserProfileData {
  id: number;
  nickname: string;
  image: string;
}

export interface OnlyUserData {
  secondAuth: boolean;
}

export interface OtherUserData {
  isFriend: boolean;
}

export interface UserSecondAuthBody {
  code: boolean;
}

export interface UserSecondAuth {
  checkIsSecondOauth: boolean;
  checkIsValid: boolean;
}

export interface ControlNickname {
  nickname: string;
  setNickname: (nickname: string) => void;
}
