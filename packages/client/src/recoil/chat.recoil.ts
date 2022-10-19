import axios from 'axios';
import { atom, selectorFamily } from 'recoil';
import { SERVERURL } from '../configs/Link.url';
import { RoomList, UnJoinedRoomList } from '../types/Room.type';

export const DMList = atom<RoomList[]>({
  key: 'DMList',
  default: [],
});

export const chatRoomList = atom<RoomList[]>({
  key: 'chatRoomList',
  default: [],
});

//[수정사항] any=> 비동기로 받는 unJoinedRoomList 타입
export const unJoinedRoomList = atom<UnJoinedRoomList[]>({
  key: 'unJoinedRoomList',
  default: [],
});

export const userAuth = atom<number | null>({
  key: 'userType',
  default: null,
});

export const userStatus = atom<number | null>({
  key: 'userStatus',
  default: null,
});

export const newParticipant = atom<number[]>({
  key: 'newParticipant',
  default: [],
});

//[수정사항] 전역으로 사용하는 데이터의 파일구조를 바꿀 것
//현재 유저가 가입된 채팅방의 리스트를 받아옵니다.
const getRoomList = async (userId: number) => {
  const response = await axios.get(`${SERVERURL}/users/${userId}/rooms`);
  return response;
};

export const getJoinedChatList = selectorFamily<any, number>({
  key: 'getJoinedChatList',
  get:
    (userId) =>
    async ({ get }) => {
      try {
        const response = await getRoomList(userId);
        console.log('33223424@!!!!', response.data);
        return response.data;
      } catch (error) {
        console.dir(error);
      }
    },
});

const getUnJoinedRoomList = async (userId: number) => {
  const response = await axios.get(`${SERVERURL}/rooms/${userId}/channels`);
  return response;
};

export const getUnJoinedChatList = selectorFamily<any, number>({
  key: 'getUnJoinedChatList',
  get:
    (userId) =>
    async ({ get }) => {
      try {
        const response = await getUnJoinedRoomList(userId);
        return response.data;
      } catch (error) {
        console.dir(error);
      }
    },
});
