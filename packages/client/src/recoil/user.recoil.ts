import { atom } from 'recoil';
import { BaseUserProfileData } from '../types/Profile.type';
import { recoilPersist } from 'recoil-persist';
import { ConnectionDto } from '../types/LogOn.type';

export const userLogStateListAtom = atom<ConnectionDto[]>({
  key: 'userStateListAtom',
  default: [],
});

export const gameTypeAtom = atom<number | null>({
  key: 'gameTypeAtom',
  default: null,
});

// 새로고침하면 데이터가 사라지는 현상이 발생하여 sessionstorage에 넣어주었습니다.
const { persistAtom } = recoilPersist({
  key: '내맘대로 정하는 키 이름',
  storage: sessionStorage,
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
