import { atom } from 'recoil';
import { BaseUserProfileData, UserSecondAuth } from '../types/Profile.type';
import { recoilPersist } from 'recoil-persist';
import { ConnectionDto } from '../types/LogOn.type';

// 새로고침하면 데이터가 사라지는 현상이 발생하여 sessionstorage에 넣어주었습니다.
const { persistAtom } = recoilPersist({
  key: 'userPersistInfo',
  storage: sessionStorage,
});

export const userLogStateListAtom = atom<ConnectionDto[]>({
  key: 'userLogStateListAtom',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const gameTypeAtom = atom<number | null>({
  key: 'gameTypeAtom',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const userDataAtom = atom<BaseUserProfileData>({
  key: 'userData',
  default: {
    id: 0,
    nickname: 'default',
    image: '',
  },
  effects_UNSTABLE: [persistAtom],
});

export const userSecondAuth = atom<UserSecondAuth>({
  key: 'userSecondAuth',
  default: {
    checkIsSecondOauth: false,
    checkIsValid: true,
  },
  effects_UNSTABLE: [persistAtom],
});
