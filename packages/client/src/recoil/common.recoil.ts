import { atom } from "recoil";
import { InviteMassageListType } from "../types/Message.type";

export const inviteMassageListAtom = atom<InviteMassageListType[]>({
    key: 'inviteMassageList',
    default: []
})