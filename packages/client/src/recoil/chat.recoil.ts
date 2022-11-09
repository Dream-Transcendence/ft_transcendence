import axios from 'axios';
import { atom, selectorFamily } from 'recoil';
import { BaseUserProfileData } from '../types/Profile.type';
import { RoomList, UnJoinedRoomList } from '../types/Room.type';

export const DMList = atom<RoomList[]>({
  key: 'DMList',
  default: [],
});

export const chatRoomList = atom<RoomList[]>({
  key: 'chatRoomList',
  default: [],
});

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

export const newParticipant = atom<BaseUserProfileData[]>({
  key: 'newParticipant',
  default: [],
});

//[수정사항] 전역으로 사용하는 데이터의 파일구조를 바꿀 것
//현재 유저가 가입된 채팅방의 리스트를 받아옵니다.
const getRoomList = async (userId: number) => {
  if (userId !== 0) {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/users/${userId}/rooms`,
    );
    return response.data;
  }
  return null;
};

export const getJoinedChatList = selectorFamily<any, number>({
  key: 'getJoinedChatList',
  get:
    (userId) =>
    async ({ get }) => {
      try {
        const response = await getRoomList(userId);
        return response;
      } catch (error) {
        console.log(error);
        // alert(error);
      }
    },
});

const getUnJoinedRoomList = async (userId: number) => {
  if (userId !== 0) {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/rooms/${userId}/channels`,
    );
    return response.data;
  }
  return null;
};

export const getUnJoinedChatList = selectorFamily<any, number>({
  key: 'getUnJoinedChatList',
  get:
    (userId) =>
    async ({ get }) => {
      try {
        const response = await getUnJoinedRoomList(userId);
        return response;
      } catch (error) {
        console.dir(error);
      }
    },
});
