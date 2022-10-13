import axios from 'axios';
import { atom, selectorFamily } from 'recoil';
import { SERVERURL } from '../configs/Link.url';
import { RoomList } from '../types/Room.type';

//[수정사항] any=>chatRoomList 타입
export const DMList = atom<RoomList[]>({
  key: 'DMList',
  default: [],
});

export const chatRoomList = atom<RoomList[]>({
  key: 'chatRoomList',
  default: [],
});

export const userAuth = atom<number | null>({
  key: 'userType',
  default: null,
});

//[수정사항] 전역으로 사용하는 데이터의 파일구조를 바꿀 것
//현재 유저가 가입된 채팅방의 리스트를 받아옵니다.
const getRoomList = async (userId: number) => {
  const response = await axios.get(`${SERVERURL}/users/${userId}/rooms`);
  return response;
};

export const getJoinedChatList = selectorFamily<any, number>({
  key: '',
  get:
    (userId) =>
    async ({ get }) => {
      try {
        const response = await getRoomList(userId);
        return response.data;
      } catch (error) {
        console.dir(error);
      }
    },
});
