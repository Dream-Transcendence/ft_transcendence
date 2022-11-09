import styled from '@emotion/styled';
import { IconButton, Input, InputAdornment } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BaseUserProfileData, UserSecondAuth } from '../../types/Profile.type';
import axios from 'axios';
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, useParams } from 'react-router-dom';
import { userDataAtom, userSecondAuth } from '../../recoil/user.recoil';
import { checkValidNickname } from '../button/block/NicknameConfirmButton';

const ProfileNicnameLayout = styled('span')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '100%',
}));

function ProfileNickname() {
  const { userId } = useParams();
  /* Here's a custom control */
  const [user, setUser] = useRecoilState<BaseUserProfileData>(userDataAtom);
  const [nickname, setNickname] = useState(user.nickname);
  const passSecondOauth = useRecoilValue<UserSecondAuth>(userSecondAuth);
  const userData = useRecoilValue(userDataAtom);
  const navigate = useNavigate();
  const [isChange, setIsChange] = useState<boolean>(false);

  async function changeName(value: string) {
    try {
      if (userData.id !== 0 && passSecondOauth.checkIsValid !== false) {
        const response = await axios.patch(
          `${process.env.REACT_APP_SERVER_URL}/users/${user.id}/nickname`,
          { nickname: value },
        );
        if (response.status === 200) {
          console.log('변경 성공');
          handleName(value);
        }
      }
    } catch (error: any) {
      if (error.response.status === 409) alert('중복된 닉네임입니다.');
      console.log(error);
    }
  }

  const handleName = (value: string) => {
    const newName = value;
    setUser({ ...user, nickname: newName });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChange(true);
    const value = event.target.value;
    setNickname(value);
  };

  const handleClick = () => {
    setIsChange(false);
    console.log('click ', nickname); //예외처리 추가
    if (checkValidNickname(nickname)) changeName(nickname);
    else alert('닉네임이 공백을 포함하거나 유효하지 않습니다!');
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    //어떤 이벤트를 명시적으로 처리하지 않은 경우, 해당 이벤트에 대한 사용자 에이전트의 기본 동작을 실행하지 않도록 지정
    event.preventDefault();
  };

  useEffect(() => {
    async function getUserData() {
      try {
        if (userData.id !== 0 && passSecondOauth.checkIsValid !== false) {
          const response = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/users/${userId}/profile`,
          );
          setUser(response.data);
        }
      } catch (error: any) {
        if (error.response.data.statusCode === 401) navigate('/');
        else {
          console.log(error);
          alert(error);
        }
      }
    }
    getUserData();
  }, []);

  //useEffect(() => {
  // if (user.nickname !== 'dha') {
  //   console.info('if', user);
  // } else {
  //   console.info('else', user);
  // }
  //setUser(response.data);
  //}, [user.nickname]);

  return (
    //[axios GET 요청] 프로필 이름
    <ProfileNicnameLayout>
      {/* [axios PATCH 요청] 본인의 프로필 변경 */}
      <Input
        defaultValue={user.nickname}
        onChange={handleChange}
        fullWidth
        endAdornment={
          <InputAdornment position="end">
            {isChange && (
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClick}
                onMouseDown={handleMouseDown}
              >
                <EditIcon />
              </IconButton>
            )}
          </InputAdornment>
        }
      />
    </ProfileNicnameLayout>
  );
}

export default ProfileNickname;
