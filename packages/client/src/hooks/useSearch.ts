import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DM, PUBLIC } from '../configs/RoomType';
import { DMList, newParticipant } from '../recoil/chat.recoil';
import { userDataAtom } from '../recoil/user.recoil';
import { chatNameSpace, ENTERCHANNEL } from '../socket/event';
import useSocket from '../socket/useSocket';
import { BaseUserProfileData } from '../types/Profile.type';
import { SearchPropsType } from '../types/search.type';

const initUser = {
  id: 0,
  nickname: 'noname',
  image: 'noimage',
};

function useSearch(
  axiosUrl: string,
  naviUrl: string,
  type?: number,
): SearchPropsType {
  const [target, setTarget] = useState<BaseUserProfileData>(initUser);
  const navigate = useNavigate();
  const user = useRecoilValue(userDataAtom);
  const [dmList, setDmList] = useRecoilState(DMList);
  const [newParticipants, setNewParticipant] = useRecoilState(newParticipant);
  const [socket] = useSocket(chatNameSpace);
  const userData = useRecoilValue(userDataAtom);
  const searchProps: SearchPropsType = {
    url: axiosUrl,
    listParams: {
      value: target,
      setValue: setTarget,
    },
    type: type,
  };
  const createDM = async (participantId: number) => {
    try {
      const existDM = dmList.every((dm) => {
        return dm.id !== participantId;
      });
      if (existDM) {
        await axios
          .post(`${process.env.REACT_APP_SERVER_URL}/rooms/dm`, {
            userId: user.id,
            participantId: participantId,
          })
          .then((res) => {
            setDmList([...dmList, res.data]);
            socket.emit(
              `${ENTERCHANNEL}`,
              {
                userId: userData.id,
                roomId: res.data.id,
                salt: '',
              },
              (response: any) => {
                navigate(`/pingpong/channel/room/${res.data.id}`);
              },
            );
            navigate(`${naviUrl}${res.data.id}`);
          });
      }
    } catch (error) {
      // alert(error);
    }
  };

  //참가자 리스트 생성
  useEffect(() => {
    if (target.id > 0 && type === 5)
      navigate(`${naviUrl}${target.id}`); //profile 이동
    else if (target.id > 0 && type === DM) {
      createDM(target.id);
    } else if (target.id > 0 && type === PUBLIC) {
      if (
        newParticipants.every((Participant) => Participant.id !== target.id)
      ) {
        const newParti: BaseUserProfileData = {
          id: target.id,
          nickname: target.nickname,
          image: target.image,
        };
        const partiArray = [...newParticipants, newParti];
        setNewParticipant(partiArray);
      }
    }
    return setTarget(initUser);
  }, [target, naviUrl, type, user.id, newParticipants]);

  return searchProps;
}
export default useSearch;
