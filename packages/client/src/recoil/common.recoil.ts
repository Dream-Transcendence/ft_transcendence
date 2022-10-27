import { atom } from "recoil";
import { InviteInfoListType } from "../types/Message.type";

export const inviteInfoListAtom = atom<InviteInfoListType[]>({
    key: 'inviteInfoListAtom',
    default: [
        {
            id: 1, //친구 초대시 필요 정보
            userId: 79589,
            message: 'junghan1님이 친구초대를 하였습니다.',
            type: 'friend',
        },
        // {
        //     id: 2, //친구 초대시 필요 정보
        //     userId: 79587,
        //     message: '게임======================================',
        //     type: 'game',
        // },
    ]
})