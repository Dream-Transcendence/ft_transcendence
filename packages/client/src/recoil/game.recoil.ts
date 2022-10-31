import { atom } from 'recoil';
import { GameRoomDto } from '../types/Game.type';

export const gameInfoAtom = atom<GameRoomDto | undefined>({
  key: 'gameInfoAtom',
  default: undefined,
});

export const gameModeAtom = atom<number>({
  key: 'gameModeAtom',
  default: 0,
});

export const gameOpponetAtom = atom<number>({
  key: 'gameOpponetAtom',
  default: 0,
});
