import styled from '@emotion/styled';
import UserProfileBox from '../../molecules/ProfileSection/UserProfileBox';
import { Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { BaseUserProfileData, FriendType, UserProfileBoxType } from '../../types/Profile.type';
import { PROFILEURL, SERVERURL } from '../../configs/Link.url';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import {
  ListGenerateLayout,
  ListLayout,
  ListUlLayout,
} from '../../atoms/list/styles/ListStylesCSS';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userLogStateListAtom } from '../../recoil/user.recoil';
import { FriendPropsType } from '../ProfilePersonal/ProfilePersonal';
import { FRIENDREQUESTACCEPTED, REJECTFRIENDREQUEST, userNameSpace } from '../../socket/event';
import useSocket from '../../socket/useSocket';
import { InviteInfoListType } from '../../types/Message.type';
import { inviteInfoListAtom } from '../../recoil/common.recoil';

const FreindListLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'end',
  justifySelf: 'start',
  alignItems: 'center',
  height: '42%',
  width: '50%',
  gridArea: 'FreindList',
  backgroundColor: '#1976D2',
  border: 'solid 1px',
}));

const TextLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '10%',
  //borderBottom: 'solid 1px',
}));

const ProfileBoxLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  alignSelf: 'start',
  justifySelf: 'start',
  width: '100%',
  height: '90%',
  borderBottom: 'solid 1px',
  borderColor: 'black',
}));

function FreindList(props: { friendProps: FriendPropsType }) {
  const navigate = useNavigate();
  const { value: friendList } = props.friendProps;
  const [listElement, setListElement] = useState<JSX.Element[]>();
  const [socket] = useSocket(userNameSpace);
  const [inviteInfoList, setInviteInfoList] = 
    useRecoilState<InviteInfoListType[]>(inviteInfoListAtom);

  useEffect(() => {
    const element = friendList.map((friendData: FriendType) => {
        //friend데이터중 profileBox를 구현하기에 필요한 정보를 넣어줌
      const userData = {
        id: friendData.user.id,
        nickname: friendData.user.nickname,
        image: friendData.user.image,
      };
      const otherProfileBoxProp: UserProfileBoxType = {
        isButton: true,
        avatarType: 'circle',
        userData: userData,
        action: () => {
          navigate(`${PROFILEURL}/${friendData.user.id}`);
        },
      };
      console.log('why',friendData.user.id);
      return (
        <ListLayout key={friendData.user.id}>
          <UserProfileBox userProfileBoxProps={otherProfileBoxProp} />
        </ListLayout>
      );
    });
    setListElement(element);
  }, [friendList, navigate]);


  //친구 추가 수락 메시지 받기
  useEffect(() => {
    socket.on(FRIENDREQUESTACCEPTED, (response: BaseUserProfileData) => {
      console.log('friendRequestAccepted', response);
      if (response) {
        const newFriend = () => {
          const userData = {
            id: response.id,
            nickname: response.nickname,
            image: response.image,
          };
          const otherProfileBoxProp: UserProfileBoxType = {
            isButton: true,
            avatarType: 'circle',
            userData: userData,
            action: () => {
              navigate(`${PROFILEURL}/${response.id}`);
            },
          };
          return (
            <ListLayout key={response.id}>
              <UserProfileBox userProfileBoxProps={otherProfileBoxProp} />
            </ListLayout>
          );
        }
        console.log('상대방이 수락하였습니다.');
        const newList = () => {
          const newList = listElement?.map((ele) => ele);
          newList?.push(newFriend());
          return newList;
        }
        setListElement(newList())
        /**
         * 상대방 수락 확인 메시지 기록
         */
        const reply = () => {
          return {
            userId: response.id,
            message:`${response.nickname}님이 요청을 수락했습니다.`,
            type: 'check',
          }
        }
        console.log(inviteInfoList,'to accecpt', reply);
        setInviteInfoList([...inviteInfoList, reply()]);
      }
    })
  }, [])


  //친구 추가 거절 메시지 받기
  useEffect(() => {
    socket.on(REJECTFRIENDREQUEST, (response: BaseUserProfileData) => {   
      if (response) {
        console.log('rejectFriendRequest', response);

        /**
         * 상대방 거절 확인 메시지 기록
         */
        const reply = () => {
          return {
            userId: response.id,
            message:`${response.nickname}님이 요청을 거절했습니다.`,
            type: 'check',
          }
        }
        console.log(inviteInfoList,'to reject', reply);
        setInviteInfoList([...inviteInfoList, reply()]);
      }
    })
  }, [])

  return (
    <FreindListLayout>
      <TextLayout>
        <Typography variant="h6" align="center">
          friend list
        </Typography>
      </TextLayout>
      <ProfileBoxLayout>
        <ListGenerateLayout>
          {/* [axios GET 요청] 친구 리스트 불러오기 */}
          {/* [Socket IO 요청]
                - Socket.emit으로 로그인 상태 보냄
                - Socket.on으로 친구유저 로그인 상태 받음
                  useEffect로 마운트시 socket 열고 언마운트시 return에 socket 닫아주면 될 듯 
                   */}
          <ListUlLayout>{listElement}</ListUlLayout>
        </ListGenerateLayout>
      </ProfileBoxLayout>
    </FreindListLayout>
  );
}

export default FreindList;
