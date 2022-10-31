import { atom } from 'recoil';
import { GameInviteInfoType, GameRoomDto } from '../types/Game.type';

export const gameInfoAtom = atom<GameRoomDto | null>({
  key: 'gameInfoAtom',
  default: null,
});

export const gameInviteInfoAtom = atom<GameInviteInfoType>({
  key: 'gameInviteInfoAtom',
  default: {
    title: '',
    hostId: 0,
    opponentId: 79654,
    mode: 1,
  },
});
