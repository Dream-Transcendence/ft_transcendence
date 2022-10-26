import { atom } from 'recoil';
import { GameRoomDto } from '../types/Game.type';

export const gameInfoAtom = atom<GameRoomDto | null>({
  key: 'gameInfoAtom',
  default: null,
});

export const gameModeAtom = atom<number>({
  key: 'gameModeAtom',
  default: 0,
});

export const gameOpponetAtom = atom<number>({
  key: 'gameOpponetAtom',
  default: 0,
})