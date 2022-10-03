import styled from '@emotion/styled';
import UserProfileBox from '../../molecules/ProfileSection/UserProfileBox';
import * as React from 'react';
import ListGenerate from '../../atoms/list/ListGenerate';
import { Typography } from '@mui/material';
import { LinkComponentResource, LinkIconResource } from '../../types/Link.type';
import LinkPageIconButton from '../../atoms/button/linkPage/LinkPageIconButton';
import { Link } from 'react-router-dom';
import LinkPageComponentButton from '../../atoms/button/linkPage/LinkPageComponentButton';
import { selector, useRecoilState, useSetRecoilState } from 'recoil';
import { BaseUserProfileData, IsUserProfilePage, UserProfileBoxTypes } from '../../types/Profile.type';
import { PROFILEURL } from '../../configs/Link.url';
import { baseUserProfileData, isUserProfilePage } from '../../pages/PingpongRoutePage';

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
  borderBottom: 'solid 1px',
}));

const ListLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '90%',
}));

const ProfileBoxLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  alignSelf: 'start',
  justifySelf: 'start',
  width: '100%',
  borderBottom: 'solid 1px',
  borderColor: 'black',
}));

const [isUser, setIsUser] = useRecoilState<IsUserProfilePage>(isUserProfilePage);
const [userData, setUserState] = useRecoilState<BaseUserProfileData>(baseUserProfileData);
function FreindListOrganisms() {
  //const [isUser, setIsUser] = useRecoilState(baseUserProfileData);
  let isUser = true;
  const userProfileBoxProps: UserProfileBoxTypes = {
    isButton: true,
    avatarType: "circle",
    action: () => {
      if (isUser === true) //user는 타인의 프로필 박스만 누를 수 있으므로 현재 보고있는 화면이 user의 profile화면이라면 바꾸기
        isUser = !isUser;//setIsUser(!isUser); //지금은 토글 형식이지만 실제 user의 데이터를 받아와서 띄워주어야함
    }
  }


  const OtherProfile: LinkComponentResource = {
    url: PROFILEURL,
    component: (
      <ProfileBoxLayout>
        <UserProfileBox userProfileBoxProps={userProfileBoxProps} />
      </ProfileBoxLayout>
    ),
  };

  return (
    <FreindListLayout>
      <TextLayout>
        <Typography variant="h6" align="center">
          freind list
        </Typography>
      </TextLayout>
      <ListLayout>
        {/* [axios GET 요청] 친구 리스트 불러오기 */}
        {/* [Socket IO 요청]
                - Socket.emit으로 로그인 상태 보냄
                - Socket.on으로 친구유저 로그인 상태 받음
                  useEffect로 마운트시 socket 열고 언마운트시 return에 socket 닫아주면 될 듯 
                   */}
        <ListGenerate
          element={
            <LinkPageComponentButton LinkComponentprops={OtherProfile} />
          }
        />
      </ListLayout>
    </FreindListLayout>
  );
}

export default FreindListOrganisms;
