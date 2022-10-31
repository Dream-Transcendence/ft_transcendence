import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { PROFILEURL, SERVERURL } from '../../configs/Link.url';
import { userDataAtom, userSecondAuth } from '../../recoil/user.recoil';
import {
  BaseUserProfileData,
  FriendType,
  UserSecondAuth,
} from '../../types/Profile.type';
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

function ProfilePersonal() {
  const user = useRecoilValue<BaseUserProfileData>(userDataAtom);
  const { userId } = useParams();
  const passSecondOauth = useRecoilValue<UserSecondAuth>(userSecondAuth);
  const userData = useRecoilValue(userDataAtom);
  const navigate = useNavigate();
  const [friendList, setFriendList] = useState<FriendType[]>([
    {
      id: 0,
      user: {
        id: 0,
        nickname: 'noname',
        image: 'noimage',
      },
      isBlocked: false,
    },
  ]);

  //[수정사항] DB에 없는 유저를 호출할 경우, [] 빈배열만 와서 진짜 친구가없는 유저와 구분하기가 힘듦
  useEffect(() => {
    async function getFriendList() {
      try {
        if (Number(userId) !== 0) {
          await axios
            .get(`${SERVERURL}/users/${userId}/friends`)
            .then((res) => {
              console.log(res.data);
              setFriendList(res.data);
            });
        }
      } catch (error) {
        alert('존재하지 않는 프로필입니다.');
        navigate(PROFILEURL);
        // navigate('/'); //[수정사항] 게임후 가끔 서버가 내려감 원인찾아야함 존재하지 않는프로필처리
      }
    }
    if (userData.id !== 0 && passSecondOauth.checkIsValid !== false) {
      getFriendList();
    }
  }, [userId]);

  const friendProps: FriendPropsType = {
    value: friendList,
    setter: setFriendList,
  };
  return (
    <ProfilePersonalLayout>
      {`${user.id}` === userId ? (
        <UserInfo />
      ) : (
        <OtherInfo friendProps={friendProps} />
      )}
      <FreindList friendProps={friendProps} />
    </ProfilePersonalLayout>
  );
}

export default ProfilePersonal;
