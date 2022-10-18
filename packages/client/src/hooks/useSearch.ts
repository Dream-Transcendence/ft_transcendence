import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { CHATROOMURL, PROFILEURL, SERVERURL } from '../configs/Link.url';
import { DM, PUBLIC } from '../configs/RoomType';
import { userDataAtom } from '../pages/PingpongRoutePage';
import { DMList, newParticipant } from '../recoil/chat.recoil';
import { SearchPropsType } from '../types/search.type';

function useSearch(
  axiosUrl: string,
  naviUrl: string,
  type?: number,
): SearchPropsType {
  const [target, setTarget] = useState<number>(0);
  const navigate = useNavigate();
  const user = useRecoilValue(userDataAtom);
  const [dmList, setDmList] = useRecoilState(DMList);
  const [newParticipants, setNewParticipant] = useRecoilState(newParticipant);
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
      await axios
        .post(`${SERVERURL}/rooms/dm`, {
          userId: user.id,
          participantId: participantId,
        })
        .then((res) => {
          setDmList([...dmList, res.data]);
          navigate(`${naviUrl}${res.data.id}`);
        });
    } catch (error) {
      console.log(error);
    }
  };

  //참가자 리스트 생성
  useEffect(() => {
    if (target > 0 && type === undefined) navigate(`${naviUrl}${target}`);
    else if (target > 0 && type === DM) {
      createDM(target);
      //[수정사항]여러개 생성되는문제 백에서 막아줄것!
    } else if (target > 0 && type === PUBLIC) {
      console.log('click', newParticipants, target);
      if (newParticipants.every((Participant) => Participant !== target)) {
        const partiArray = [...newParticipants, target];
        setNewParticipant(partiArray);
      }
    }
    return setTarget(0);
  }, [target, naviUrl, type, user.id, newParticipants]);
  return searchProps;
}
export default useSearch;
