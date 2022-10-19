import { atom } from "recoil";
import { GameRoomDto } from "../types/Game.type";

export const gameInfo = atom<GameRoomDto | null>({
    key: 'gameInfo',
    default: null,
  });