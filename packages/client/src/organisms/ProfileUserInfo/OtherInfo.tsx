import ProfileImage from '../../atoms/profile/ProfileImage';
import SecondAuthSwitch from '../../atoms/button/switch/SecondAuth';
import ProfileNicname from '../../atoms/input/ProfileNickname';
import {
  ProfileActionLayout,
  UserInfoLayout,
  UserNicknameLayout,
  UserPictureLayout,
} from '../OrganismsStyles/ProfileOrganismsCss';
import OtherProfileNicname from '../../atoms/text/OtherProfileNicname';
import CustomIconButton from '../../atoms/button/icon/CustomIconButtion';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { CustomIconProps } from '../../types/Link.type';
import { useEffect, useState } from 'react';
import { BaseUserProfileData, FriendType } from '../../types/Profile.type';
import axios from 'axios';
import { SERVERURL } from '../../configs/Link.url';
import { useParams } from 'react-router-dom';
import { AlternateEmailTwoTone } from '@mui/icons-material';
import { useRecoilValue } from 'recoil';
import { userDataAtom } from '../../pages/PingpongRoutePage';
import Diversity1Icon from '@mui/icons-material/Diversity1';

function OtherInfo() {
  const { id } = useRecoilValue(userDataAtom);
  const { userId: otherId } = useParams();
  const [userData, setUserData] = useState<BaseUserProfileData>({
    id: 0,
    nickname: 'noname',
    image: 'noimage',
  });
  const [isFriend, setIsFriend] = useState<boolean | undefined>(false);

  async function getUserData() {
    try {
      const response = await axios.get(`${SERVERURL}/users/${otherId}/profile`);
      setUserData(response.data);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  //해당 유저가 본인과 친구인지 확인하여 친구 추가 버튼 vislble 정하기
  async function checkIsFriend() {
    try {
      //친구 찾는 로직 수정되면 테스트 해보기
      // const friendList = await axios.post(
      //   `${SERVERURL}/users/${id}/friends/search`,
      //   {
      //     id: id,
      //     nickname: userData.nickname,
      //   },
      // );
      // if (friendList.data.length > 0) {
      //   console.log('already friend');
      //   return true;
      // }
      return false;
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  useEffect(() => {
    getUserData();
  }, [otherId]);

  useEffect(() => {
    const promise = checkIsFriend();
    promise.then((result) => setIsFriend(result));
  });

  async function addFriend() {
    try {
      /**
       * 1. 소켓으로 친구 요청 메시지를 보내기
       * 2. 요청 전송완료 alert 띄워 주어야 함
       * 3. 수락시 post 보내기
       */
      const responseReq = await axios.post(
        `${SERVERURL}/users/${id}/requests`,
        {
          id: otherId,
        },
      );
      if (responseReq.status === 409) {
        console.log('already friend');
      }
      const responseAdd = await axios.post(`${SERVERURL}/users/${id}/friends`, {
        id: otherId,
      });
      if (responseAdd.status === 201) {
        console.log('친구추가 완료');
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  const addFriendProps: CustomIconProps = {
    icon: <PersonAddIcon />,
    action: addFriend,
  };

  const alreadFriendProps: CustomIconProps = {
    icon: <Diversity1Icon />,
    action: () => {
      alert('이미 친구입니다.');
    },
  };

  return (
    <UserInfoLayout>
      <UserPictureLayout>
        <ProfileImage userData={userData} />
      </UserPictureLayout>
      <UserNicknameLayout>
        <OtherProfileNicname userData={userData} />
      </UserNicknameLayout>
      <ProfileActionLayout>
        {/* [Socket IO 요청] 상대방에게 친구수락 팝업 뜨게할 것 */}
        <CustomIconButton customProps={addFriendProps} />
        <CustomIconButton customProps={alreadFriendProps} />
      </ProfileActionLayout>
    </UserInfoLayout>
  );
}

export default OtherInfo;
