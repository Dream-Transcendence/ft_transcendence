import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { SERVERURL } from '../../configs/Link.url';
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

function ProfilePersonal() {
  const user = useRecoilValue<BaseUserProfileData>(userDataAtom);
  const { userId } = useParams();
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

  useEffect(() => {
    async function getFriendList() {
      try {
        const response = await axios.get(
          `${SERVERURL}/users/${userId}/friends`,
        );
        setFriendList(response.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
    getFriendList();
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
