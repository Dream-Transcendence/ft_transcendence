export interface UserLadderType {
  rank: string;
  winCount: number;
  loseCount: number;
}

export interface UserProfileBoxType {
  isButton: boolean;
  avatarType: string;
  userData: BaseUserProfileData;
  action?: () => void;
}

export interface FriendList {
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

export interface UserSecondAuth {
  authenticated: boolean;
}
