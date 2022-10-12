import styled from '@emotion/styled';
import UserProfileBox from '../../molecules/ProfileSection/UserProfileBox';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { FriendType, UserProfileBoxType } from '../../types/Profile.type';
import { SERVERURL } from '../../configs/Link.url';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ListGenerateLayout,
  ListLayout,
  ListUlLayout,
} from '../../atoms/list/styles/ListStylesCSS';

const FreindListLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'start',
  justifySelf: 'end',
  alignItems: 'center',
  height: '75%',
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

function FreindListOrganisms() {
  const { userId } = useParams();
  const [friendList, setFriendList] = useState<FriendType[]>([
    {
      id: 1,
      user: {
        id: 1,
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

  const listElement: JSX.Element[] = friendList.map((friendData) => {
    const userData = {
      nickname: friendData.user.nickname,
      image: friendData.user.image,
    };
    const otherProfileBoxProp: UserProfileBoxType = {
      isButton: true,
      avatarType: 'circle',
      userData: userData,
      action: () => {
        window.location.href = `http://localhost:3005/pingpong/profile/${friendData.user.id}`;
      },
    };
    return (
      <ListLayout key={friendData.user.id}>
        <UserProfileBox userProfileBoxProps={otherProfileBoxProp} />
      </ListLayout>
    );
  });

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

export default FreindListOrganisms;
