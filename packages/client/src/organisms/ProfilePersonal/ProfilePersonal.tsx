import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { SERVERURL } from '../../configs/Link.url';
import { checkFriendRequestAtom } from '../../recoil/common.recoil';
import {
  BaseUserProfileData,
  FriendType,
  UserSecondAuth,
} from '../../types/Profile.type';
import { userDataAtom, userSecondAuth } from '../../recoil/user.recoil';
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
    console.log(id, '의 친구 목록');
    const response = await axios.get(`${SERVERURL}/users/${id}/friends`);
    setter(response.data);
    console.log('친구 목록을 최신화 하였습니다.');
  } catch (error) {
    alert(error);
    console.log(error);
  }
}

function ProfilePersonal() {
  const userData = useRecoilValue<BaseUserProfileData>(userDataAtom);
  const { userId: paramsId } = useParams();
  const [friendList, setFriendList] = useState<FriendType[]>([]);
  const [checkFriendRequest, setCheckFriendRequest] = useRecoilState<boolean>(
    checkFriendRequestAtom,
  );
  const passSecondOauth = useRecoilValue<UserSecondAuth>(userSecondAuth);

  /**
   * 친구 목록 최신화
   */
  useEffect(() => {
    if (userData.id !== 0 && passSecondOauth.checkIsValid !== false) {
      setCheckFriendRequest(false);
      getSetFriendList(paramsId, setFriendList);
    }
  }, [paramsId, checkFriendRequest, userData.id, setCheckFriendRequest]);

  const friendProps: FriendPropsType = {
    value: friendList,
    setter: setFriendList,
  };
  return (
    <ProfilePersonalLayout>
      {`${userData.id}` === paramsId ? <UserInfo /> : <OtherInfo />}
      <FreindList friendProps={friendProps} />
    </ProfilePersonalLayout>
  );
}

export default ProfilePersonal;
