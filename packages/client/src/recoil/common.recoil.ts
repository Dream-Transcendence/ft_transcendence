import { atom } from 'recoil';
import { InviteInfoListType } from '../types/Message.type';

export const inviteInfoListAtom = atom<InviteInfoListType[]>({
  key: 'inviteInfoListAtom',
  default: [],
});
