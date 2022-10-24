import { atom } from 'recoil';
import { UserStateType } from '../types/LogOn.type';

//로그인중인 유저 리스트 목록
export const userLogStateListAtom = atom<UserStateType[]>({
  key: 'userLogStateListAtom',
  default: [],
});

// export const logStateAtom = atom<number | null>({
//     key: 'logStateAtom',
//     default: null,
//   });
