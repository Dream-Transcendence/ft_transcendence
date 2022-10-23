import { atom } from 'recoil';
import { UserStateType } from '../types/LogOn.type';

export const userStateListAtom = atom<UserStateType[]>({
  key: 'userStateListAtom',
  default: [],
});

export const userGameTypeAtom = atom<string | null>({
  key: 'userGameTypeAtom',
  default: null,
});
