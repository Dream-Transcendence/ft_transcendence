import ProfileImage from '../../atoms/profile/ProfileImage';
import SecondAuthSwitch from '../../atoms/button/switch/SecondAuth';
import ProfileNickname from '../../atoms/input/ProfileNickname';
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
import { FriendPropsType } from '../ProfilePersonal/ProfilePersonal';

function OtherInfo(props : {friendProps: FriendPropsType}) {
  const { id } = useRecoilValue(userDataAtom);
  const { userId: otherId } = useParams();
  const {value: friendList, setter: setFriendList } = props.friendProps;

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

  useEffect(() => {
    getUserData();
  }, [otherId]);

  //해당 유저가 본인과 친구인지 확인하여 친구 추가 버튼 vislble 정하기
  async function checkIsFriend() {
    try {
      //친구 찾는 로직 수정되면 테스트 해보기
      const response = await axios.get(`${SERVERURL}/users/${id}/friends/${otherId}`);
      if (await response.status === 201) {
        setIsFriend(true);
      } else {
        setIsFriend(false);
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  useEffect(() => {
    checkIsFriend();
  }, [otherId]);

  async function sendRequestFriend() {
    try {
      const responseReq = await axios.post(
        `${SERVERURL}/users/${id}/requests`,
        {
          id: Number(otherId),
        },
      );
      if (responseReq.status === 200) {
        return true;
      }
      return false;
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }
  
  async function addRequestFriend() {
    try {
      const responseAdd = await axios.post(`${SERVERURL}/users/${id}/friends`, {
        id: Number(otherId),
      });
      if (responseAdd.status === 201) {
        setFriendList(friendList.concat(responseAdd.data));
        return true;
      } else {
        return false;
      }
    } catch(error: any) {
      alert(error);
      console.log(error);
    } 
  }
  async function addFriend() {
    try {
      /**
       * 1. 소켓으로 친구 요청 메시지를 보내기
       * 2. 요청 전송완료 alert 띄워 주어야 함
       * 3. 수락시 post 보내기
       */
      //친구 요청
      const sendReq = await sendRequestFriend();
      console.log('11', sendReq);
      if (!sendReq) { //비동기 처리에 의해서 값 변경이 바로 안되어 반대로 처리해둠 추후 요청 확인을 받는 것으로 처리할 예정
        //요청을 보낸 쪽이 확인 응답을 받고 다시 추가 요청을 보내는데 수신 쪽에서 확인을 받고 친구 추가를 바로 하면 될 것 같음
        //
        const addReq = await addRequestFriend();
        if (addReq) {
          alert('친구 추가 완료');
          console.log('친구 추가 완료');
        }
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
      console.log('이미 친구입니다.');
    },
  };
  // console.log(isFriend);

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
        {isFriend ? 
          <CustomIconButton customProps={alreadFriendProps} />:
          <CustomIconButton customProps={addFriendProps} /> }
      </ProfileActionLayout>
    </UserInfoLayout>
  );
}

export default OtherInfo;
