import { atom } from "recoil";
import { LogStateType } from "../types/LogOn.type";

export const logStateListAtom = atom<LogStateType[]>({
    key: 'logStateListAtom',
    default: [],
  });

// export const logStateAtom = atom<number | null>({
//     key: 'logStateAtom',
//     default: null,
//   });