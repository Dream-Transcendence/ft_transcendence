import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { PROFILEURL, SERVERURL } from '../../configs/Link.url';
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
  isBlock?: boolean;
  setIsBlock?: (isBlock: boolean) => void;
}

export function ProfilePersonal() {
  const userData = useRecoilValue<BaseUserProfileData>(userDataAtom);
  const { userId: paramsId } = useParams();
  const [checkFriendRequest, setCheckFriendRequest] = useRecoilState<boolean>(
    checkFriendRequestAtom,
  );
  const passSecondOauth = useRecoilValue<UserSecondAuth>(userSecondAuth);
  const navigate = useNavigate();
  const [friendList, setFriendList] = useState<FriendType[]>([]);
  const [isBlock, setIsBlock] = useState<boolean>(false);

  async function getSetFriendList(
    id: string | undefined,
    setter: React.Dispatch<React.SetStateAction<FriendType[]>>,
  ) {
    try {
      console.log(id, '의 친구 목록');
      const response = await axios.get(`${SERVERURL}/users/${id}/friends`);
      setter(response.data);
      console.log('친구 목록을 최신화 하였습니다.');
    } catch (error: any) {
      if (error.response.data.statusCode === 401) navigate('/');
      else {
        alert('존재하지 않는 프로필입니다.');
        navigate(PROFILEURL);
      }

      // alert(error);
      // console.log(error);
    }
  }

  /**
   * 친구 목록 최신화
   */
  useEffect(() => {
    if (userData.id !== 0 && passSecondOauth.checkIsValid !== false) {
      setCheckFriendRequest(false);
      getSetFriendList(paramsId, setFriendList);
    }
  }, [paramsId, checkFriendRequest, userData.id, setCheckFriendRequest]);

  useEffect(() => {
    async function checkIsBlock() {
      await axios
        .get(`${SERVERURL}/users/${userData.id}/blocks/${paramsId}`)
        .then((response: any) => {
          console.log(response);
          if (response.status === 200) {
            setIsBlock(response.data.isBlocked);
          }
        })
        .catch((error: any) => {
          console.log('error status : ', error.response.data.statusCode);
        });
    }
    if (paramsId && userData.id !== +paramsId) checkIsBlock();
  }, [isBlock, setIsBlock, paramsId, userData.id]);

  const friendProps: FriendPropsType = {
    value: friendList,
    setter: setFriendList,
    isBlock: isBlock,
    setIsBlock: setIsBlock,
  };
  return (
    <ProfilePersonalLayout>
      {`${userData.id}` === paramsId ? (
        <UserInfo />
      ) : (
        <OtherInfo friendProps={friendProps} />
      )}
      <FreindList friendProps={friendProps} />
    </ProfilePersonalLayout>
  );
}

export default ProfilePersonal;
