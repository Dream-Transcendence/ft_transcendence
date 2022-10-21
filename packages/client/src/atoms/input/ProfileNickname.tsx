import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import styled from '@emotion/styled';
import { Edit, WidthFull } from '@mui/icons-material';
import { IconButton, Input, InputAdornment, TextField } from '@mui/material';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { BaseUserProfileData } from '../../types/Profile.type';
import axios from 'axios';
import { SERVERURL } from '../../configs/Link.url';
import { useEffect, useState } from 'react';
import CustomIconButton from '../button/icon/CustomIconButtion';
import EditIcon from '@mui/icons-material/Edit';
import { CustomIconProps } from '../../types/Link.type';
import { useParams } from 'react-router-dom';
import { userDataAtom } from '../../recoil/user.recoil';

const ProfileNicnameLayout = styled('span')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '100%',
  backgroundColor: 'green',
}));

function ProfileNickname() {
  const { userId } = useParams();
  /* Here's a custom control */
  const [user, setUser] = useRecoilState<BaseUserProfileData>(userDataAtom);
  const [nickname, setNickname] = useState(user.nickname);

  async function changeName(value: string) {
    try {
      const response = await axios.patch(
        `${SERVERURL}/users/${user.id}/profile`,
        { nickname: value },
      );
      if (response.status === 200) {
        console.log('변경 성공');
        handleName(value);
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  const handleName = (value: string) => {
    const newName = value;
    setUser({ ...user, nickname: newName });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setNickname(value);
  };

  const handleClick = () => {
    console.log('click ', nickname);
    changeName(nickname);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    async function getUserData() {
      try {
        const response = await axios.get(
          `${SERVERURL}/users/${userId}/profile`,
        );
        setUser(response.data);
      } catch (error) {
        alert(error);
        console.log(error);
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
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClick}
              onMouseDown={handleMouseDown}
            >
              <EditIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </ProfileNicnameLayout>
  );
}

export default ProfileNickname;
