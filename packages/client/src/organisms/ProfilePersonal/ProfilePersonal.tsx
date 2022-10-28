import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { SERVERURL } from '../../configs/Link.url';
import { checkFriendRequestAtom } from '../../recoil/common.recoil';
import { userDataAtom } from '../../recoil/user.recoil';
import { BaseUserProfileData, FriendType } from '../../types/Profile.type';
import FreindList from '../ProfileFreindList/FreindList';
import OtherInfo from '../ProfileUserInfo/OtherInfo';
import UserInfo from '../ProfileUserInfo/UserInfo';

const ProfilePersonalLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'space-evenly',
  justifySelf: 'space-evenly',
  justifyItems: 'space-evenly',
  justifyContent: 'space-evenly',
  alignItems: 'space-evenly',
  height: '100%',
  width: '100%',
  gridArea: 'ProfilePersonal',
}));

export interface FriendPropsType {
  value: FriendType[];
  setter: React.Dispatch<React.SetStateAction<FriendType[]>>;
}

export async function getSetFriendList(
  id: string | undefined,
  setter: React.Dispatch<React.SetStateAction<FriendType[]>>,
) {
  try {
    const response = await axios.get(`${SERVERURL}/users/${id}/friends`);
    setter(response.data);
    console.log('친구 목록을 최신화 하였습니다.');
  } catch (error) {
    alert(error);
    console.log(error);
  }
}

function ProfilePersonal() {
  const user = useRecoilValue<BaseUserProfileData>(userDataAtom);
  const { userId: paramsId } = useParams();
  const [friendList, setFriendList] = useState<FriendType[]>([]);
  const [checkFriendRequest, setSheckFriendRequest] = useRecoilState(
    checkFriendRequestAtom,
  );

  /**
   * 친구 목록 최신화
   */
  useEffect(() => {
    //보고있는 화면이 본인 화면이면
    console.log(user.id === Number(paramsId) ? '본인화면' : '상대화면');
    if (user.id === Number(paramsId)) {
      getSetFriendList(paramsId, setFriendList);
      //보고있는 화면인 친구 화면이면
    } else if (user.id !== Number(paramsId)) {
      getSetFriendList(paramsId, setFriendList);
    }
    setSheckFriendRequest(false);
  }, [paramsId, checkFriendRequest, user.id, setSheckFriendRequest]);

  const friendProps: FriendPropsType = {
    value: friendList,
    setter: setFriendList,
  };
  return (
    <ProfilePersonalLayout>
      {`${user.id}` === paramsId ? (
        <UserInfo />
      ) : (
        <OtherInfo friendProps={friendProps} />
      )}
      <FreindList friendProps={friendProps} />
    </ProfilePersonalLayout>
  );
}

export default ProfilePersonal;
