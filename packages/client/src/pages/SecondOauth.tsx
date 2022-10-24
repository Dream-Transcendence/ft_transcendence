import styled from '@emotion/styled';
import { Button, Input } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { PROFILEURL } from '../configs/Link.url';
import { userDataAtom } from '../recoil/user.recoil';
import { BaseUserProfileData } from '../types/Profile.type';

const SecondOauthPageLayout = styled('div')(({ theme }) => ({
  display: 'grid',
  alignItems: 'center',
  justifyItems: 'center',
  backgroundColor: '#6BADE2',
  width: '100%',
  height: '100%',
}));

const SecondOauthInitLayout = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyItems: 'center',
  backgroundColor: '#0288D1',
  width: '24%',
  height: '8%',
  border: 'solid 1px',
}));

function SecondOauth() {
  const [seconedOauth, setSecondOauth] = useState<string>('');
  const [isRequest, setIsRequest] = useState<boolean>(false);
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState<BaseUserProfileData>(userDataAtom);

  const handleSecondOauth = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSecondOauth(value);
  };

  const requestSecondOauth = async () => {
    await axios
      .post(`/users/${user.id}/2nd-auth`)
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
      .patch(`/users/${user.id}/2nd-auth`)
      .then(() => {
        navigate(`${PROFILEURL}/${user.id}`);
      })
      .catch((error) => {
        console.dir(error);
        alert('인증 전송 실패');
      });
  };

  const handleRequest = () => {
    requestSecondOauth();
  };

  const handleRegist = () => {
    registSecondOauth();
  };

  return (
    <SecondOauthPageLayout>
      <SecondOauthInitLayout>
        <Input
          // style={divStyle}
          // value={name}
          placeholder="인증번호를 입력해주세요"
          onChange={handleSecondOauth}
        ></Input>
        {!isRequest && (
          <Button fullWidth variant="contained" onClick={handleRequest}>
            인증요청하기
          </Button>
        )}
        {isRequest && (
          <Button fullWidth variant="contained" onClick={handleRegist}>
            등록하기
          </Button>
        )}
      </SecondOauthInitLayout>
    </SecondOauthPageLayout>
  );
}

export default SecondOauth;
