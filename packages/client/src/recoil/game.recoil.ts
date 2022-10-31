import { atom } from 'recoil';
import { GameInviteInfoType, GameRoomDto } from '../types/Game.type';

export const gameInfoAtom = atom<GameRoomDto | undefined>({
  key: 'gameInfoAtom',
  default: undefined,
});

export const gameInviteInfoAtom = atom<GameInviteInfoType>({
  key: 'gameInviteInfoAtom',
  default: {
    title: '',
    hostId: 0,
    opponentId: 0,
    mode: 1,
  },
});
