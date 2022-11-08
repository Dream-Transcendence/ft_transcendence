import styled from '@emotion/styled';
import NicknameInit from '../organisms/NicknameInit/NicknameInit';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BaseUserProfileData, UserSecondAuth } from '../types/Profile.type';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { PROFILEURL } from '../configs/Link.url';
import { userDataAtom, userSecondAuth } from '../recoil/user.recoil';

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
  const [passSecondOauth, setPassSecondOauth] =
    useRecoilState<UserSecondAuth>(userSecondAuth);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserData() {
      await axios
        .get(`${process.env.REACT_APP_SERVER_URL}/users/userinfo`)
        .then((res) => {
          setUser(res.data);
          console.log('nickname!!', res.data.nickname);
          if (res.data.nickname.length <= 10) {
            //최초 가입 유저
            setCheckOauth(true);
          } //이미 가입된 유저면
        })
        .catch(() => {
          navigate('/');
          console.log('no auth');
        });
    }
    try {
      //이미 로그인 된 유저면 바로 프로필로보내기
      console.log(
        user.id,
        user.nickname.length,
        passSecondOauth.checkIsValid,
        passSecondOauth,
      );
      if (user.id === 0 || (user.id !== 0 && user.nickname.length > 10)) {
        getUserData();
      } else if (
        user.id !== 0 &&
        user.nickname.length <= 10 &&
        passSecondOauth.checkIsValid === true
      ) {
        navigate(`${PROFILEURL}/${user.id}`);
      } else if (
        user.id !== 0 &&
        user.nickname.length <= 10 &&
        passSecondOauth.checkIsSecondOauth === true
      ) {
        navigate('/secondOauth');
      }
    } catch {
      console.log('error: PingpongRoutePage()');
    }
  }, []);

  useEffect(() => {
    if (checkOauth) {
      const getSecondOauth = async () => {
        await axios
          .get(`${process.env.REACT_APP_SERVER_URL}/users/${user.id}/2nd-auth`)
          .then((res) => {
            console.log(res);
            if (!res.data.authenticated) {
              // 2nd 가 설정되지않은경우
              setPassSecondOauth({
                checkIsSecondOauth: false,
                checkIsValid: true,
              });
              navigate(`${PROFILEURL}/${user.id}`);
            } else {
              setPassSecondOauth({
                checkIsSecondOauth: true,
                checkIsValid: false,
              });
              navigate('/secondOauth');
            }
          });
      };
      try {
        getSecondOauth();
      } catch (error) {
        console.dir(error);
      }
    }
  }, [checkOauth, user.id]);
  return (
    <NicknamePageLayout>{user.id !== 0 && <NicknameInit />}</NicknamePageLayout>
  );
}

export default NicknamePage;
