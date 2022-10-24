import styled from '@emotion/styled';
import NicknameInit from '../organisms/NicknameInit/NicknameInit';
import { TextField } from '@mui/material';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BaseUserProfileData } from '../types/Profile.type';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { PROFILEURL, SERVERURL } from '../configs/Link.url';
import { userDataAtom } from '../recoil/user.recoil';

const NicknamePageLayout = styled('div')(({ theme }) => ({
  display: 'grid',
  alignItems: 'center',
  justifyItems: 'center',
  backgroundColor: '#6BADE2',
  width: '100%',
  height: '100%',
}));

function NicknamePage() {
  const [user, setUser] = useRecoilState<BaseUserProfileData>(userDataAtom);
  const [checkOauth, setCheckOauth] = useState(false);
  const navigate = useNavigate();

  //[수정사항] 이미 로그인한적있는 유저는 nickname변경창조차 뜨지않아야함
  useEffect(() => {
    async function getUserData() {
      await axios
        .get(`${SERVERURL}/users/userinfo`)
        .then((res) => {
          console.log('!!!!', res.data);
          //[수정사항][로그인]
          if (res.data.nickname.length > 10) {
            //최초 가입 유저
            setUser(res.data);
          } else {
            setCheckOauth(true);
            // else navigate(`${PROFILEURL}/${user.id}`);
          } //이미 가입된 유저면
        })
        .catch(() => {
          navigate('/');
          console.log('no auth');
        });
    }
    try {
      //이미 로그인 된 유저면 바로 프로필로보내기
      if (user.id === 0) {
        getUserData();
      } else {
        navigate(`${PROFILEURL}/${user.id}`);
      }
    } catch {
      console.log('error: PingpongRoutePage()');
    }
  }, []);

  useEffect(() => {
    if (checkOauth) {
      const getSecondOauth = async () => {
        await axios.get(`/users/${user.id}/2nd-auth`).then((res) => {
          if (!res.data.authenticated) navigate(`${PROFILEURL}/${user.id}`);
          else navigate('/secondOauth');
        });
      };
      try {
        getSecondOauth();
      } catch (error) {
        console.dir(error);
      }
    }
  }, [checkOauth]);

  return (
    <NicknamePageLayout>
      <NicknameInit />
    </NicknamePageLayout>
  );
}

export default NicknamePage;
