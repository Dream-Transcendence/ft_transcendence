import ProfileImage from '../../atoms/profile/ProfileImage';
import BlockIcon from '@mui/icons-material/Block';
import FaceRetouchingOffIcon from '@mui/icons-material/FaceRetouchingOff';
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
import { BaseUserProfileData, UserSecondAuth } from '../../types/Profile.type';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import { userDataAtom, userSecondAuth } from '../../recoil/user.recoil';
import { FriendPropsType } from '../ProfilePersonal/ProfilePersonal';
import { FRIENDREQUEST, userNameSpace } from '../../socket/event';
import useSocket from '../../socket/useSocket';
import { CheckFriendDto, InviteInfoListType } from '../../types/Message.type';
import { inviteInfoListAtom } from '../../recoil/common.recoil';
import {
  blockUser,
  unBlockUser,
} from '../../molecules/ChatSection/InfoBoxDMFunction';
import { BLOCK, UNBLOCK } from '../../configs/Block.case';

function OtherInfo(props: { friendProps: FriendPropsType }) {
  const { value: friendList, isBlock, setIsBlock } = props.friendProps;
  const { id } = useRecoilValue(userDataAtom);
  const [socket] = useSocket(userNameSpace);
  const { userId: otherId } = useParams();
  const [inviteInfoList, setInviteInfoList] =
    useRecoilState<InviteInfoListType[]>(inviteInfoListAtom);
  const passSecondOauth = useRecoilValue<UserSecondAuth>(userSecondAuth);
  const [userData, setUserData] = useState<BaseUserProfileData>({
    id: 0,
    nickname: 'noname',
    image: 'noimage',
  });
  const [isFriend, setIsFriend] = useState<boolean | undefined>(false);

  useEffect(() => {
    async function getUserData() {
      try {
        if (id !== 0 && passSecondOauth.checkIsValid !== false) {
          const response = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/users/${otherId}/profile`,
          );
          setUserData(response.data);
        }
      } catch (error) {
        // alert(error);
        // console.log(error);
      }
    }
    getUserData();
  }, [otherId]);

  //해당 유저가 본인과 친구인지 확인하여 친구 추가 버튼 vislble 정하기
  async function checkIsFriend() {
    await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/users/${id}/friends/${otherId}`)
      .then((response: any) => {
        const res: CheckFriendDto = response.data;
        setIsFriend(res.isFriend);
      })
      .catch((error: any) => {
        // alert(error);
      });
  }

  useEffect(() => {
    if (id !== 0 && passSecondOauth.checkIsValid !== false) {
      checkIsFriend();
    }
  }, [otherId, friendList]);

  // async function addRequestFriend() {
  //   try {
  //     const responseAdd = await axios.post(`${REACT_APP_SERVER_URL}/users/${id}/friends`, {
  //       id: Number(otherId),
  //     });
  //     if (responseAdd.status === 201) {
  //       setFriendList(friendList.concat(responseAdd.data));
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } catch (error: any) {
  //     alert(error);
  //     console.log(error);
  //   }
  // }

  function sendRequestFriend() {
    try {
      socket.emit(FRIENDREQUEST, {
        requestorId: id,
        responserId: Number(otherId),
      });
      const reply = () => {
        return {
          userId: userData.id,
          message: `${userData.nickname}님에게 친구 초대를 보냈습니다.`,
          type: 'check',
        };
      };
      setInviteInfoList([...inviteInfoList, reply()]);
      console.log('socket : 친구 요청 보냈습니다.');
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  const addFriendProps: CustomIconProps = {
    icon: <PersonAddIcon />,
    action: sendRequestFriend,
  };

  const alreadyFriendProps: CustomIconProps = {
    icon: <Diversity1Icon />,
    action: () => {
      alert('이미 친구입니다.');
      console.log('이미 친구입니다.');
    },
  };

  const setBlock = () => {
    if (setIsBlock) setIsBlock(true);
  };

  const setUnBlock = () => {
    if (setIsBlock) setIsBlock(false);
  };

  async function handlerBlock() {
    if (userData.id !== undefined && isBlock === UNBLOCK) {
      blockUser(userData.id, id, setBlock);
      alert('유저를 차단하였습니다.');
    } else if (userData.id !== undefined && isBlock === BLOCK) {
      unBlockUser(userData.id, id, setUnBlock);
      alert('유저를 차단을 해제하였습니다.');
    }
  }

  const customUnBlockProps: CustomIconProps = {
    icon: <BlockIcon />,
    action: handlerBlock,
  };

  const customBlockProps: CustomIconProps = {
    icon: <FaceRetouchingOffIcon />,
    action: handlerBlock,
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
        {isFriend ? (
          <CustomIconButton customProps={alreadyFriendProps} />
        ) : (
          <CustomIconButton customProps={addFriendProps} />
        )}
        {isBlock ? (
          <CustomIconButton customProps={customBlockProps} />
        ) : (
          <CustomIconButton customProps={customUnBlockProps} />
        )}
      </ProfileActionLayout>
    </UserInfoLayout>
  );
}

export default OtherInfo;
