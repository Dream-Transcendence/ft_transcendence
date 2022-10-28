import { atom } from 'recoil';
import { InviteInfoListType } from '../types/Message.type';

export const inviteInfoListAtom = atom<InviteInfoListType[]>({
  key: 'inviteInfoListAtom',
  default: [],
});

export const checkFriendRequestAtom = atom<boolean>({
  key: 'checkFriendRequestAtom',
  default: false,
});
