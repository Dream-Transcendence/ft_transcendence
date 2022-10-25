import styled from '@emotion/styled';
import { Button, Input } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { PROFILEURL, SERVERURL } from '../configs/Link.url';
import { userDataAtom, userSecondAuth } from '../recoil/user.recoil';
import { BaseUserProfileData, UserSecondAuth } from '../types/Profile.type';
import { IsNumber } from 'class-validator';
import { onlyNumbers } from '../utils/onlyNumber';

const SecondOauthPageLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  alignContent: 'center',
  justifyItems: 'center',
  flexDirection: 'column',
  backgroundColor: '#6BADE2',
  width: '100%',
  height: '100%',
}));

const SecondOauthayout = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  alignContent: 'center',
  justifyItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '90%',
}));

const SecondOauthInitLayout = styled('section')(({ theme }) => ({
  flexDirection: 'column',
  display: 'flex',
  alignItems: 'center',
  justifyItems: 'center',
  backgroundColor: '#0288D1',
  width: '30%',
  height: '8%',
  border: 'solid 1px',
}));

const SecondOauthInputLayout = styled('section')(({ theme }) => ({
  flexDirection: 'column',
  display: 'flex',
  alignItems: 'center',
  justifyItems: 'center',
  width: '30%',
  height: '8%',
}));

const OutButtonLayout = styled('section')(({ theme }) => ({
  marginLeft: '85%',
}));

function SecondOauthPage() {
  const [seconedOauth, setSecondOauth] = useState<string>('');
  const [isRequest, setIsRequest] = useState<boolean>(false);
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState<BaseUserProfileData>(userDataAtom);
  const [passSecondOauth, setPassSecondOauth] =
    useRecoilState<UserSecondAuth>(userSecondAuth);

  useEffect(() => {
    //[수정사항][2nd] api완성기다리는중
    if (user.id === 0) navigate('/');
  }, [user.id, navigate]);

  const handleSecondOauth = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSecondOauth(value);
  };

  const requestSecondOauth = async () => {
    await axios
      .post(`${SERVERURL}/users/${user.id}/2nd-auth`)
      .then((res) => {
        setIsRequest(true);
      })
      .catch((error) => {
        console.dir(error);
        alert('인증 요청 실패');
      });
  };

  const registSecondOauth = async () => {
    await axios
      .patch(`${SERVERURL}/users/${user.id}/2nd-auth`, {
        code: +seconedOauth,
      })
      .then((res) => {
        console.log('res!', res);
        setPassSecondOauth({
          checkIsSecondOauth: true,
          checkIsValid: true,
        });
        navigate(`${PROFILEURL}/${user.id}`);
      })
      .catch((error) => {
        console.dir(error);
        alert('인증코드가 잘못되었습니다.');
      });
  };

  const handleRequest = () => {
    requestSecondOauth();
  };

  const handleRegist = () => {
    console.log('second:', seconedOauth);
    if (seconedOauth === '') {
      alert('인증코드를 입력해주세요.');
      return;
    } else if (!onlyNumbers(seconedOauth)) {
      alert('숫자만 입력해주세요.');
      return;
    }
    registSecondOauth();
  };

  const handleOut = () => {
    navigate(-1);
  };

  return (
    <SecondOauthPageLayout>
      <SecondOauthayout>
        {!isRequest ? (
          <SecondOauthInputLayout>
            <Button fullWidth variant="contained" onClick={handleRequest}>
              인증요청하기
            </Button>
          </SecondOauthInputLayout>
        ) : (
          <SecondOauthInitLayout>
            <Input
              // style={divStyle}
              // value={name}
              placeholder="인증번호를 입력해주세요"
              onChange={handleSecondOauth}
            ></Input>
            <Button fullWidth variant="contained" onClick={handleRegist}>
              등록하기
            </Button>
          </SecondOauthInitLayout>
        )}
      </SecondOauthayout>
      <OutButtonLayout>
        <Button variant="contained" onClick={handleOut}>
          나가기
        </Button>
      </OutButtonLayout>
    </SecondOauthPageLayout>
  );
}

export default SecondOauthPage;
