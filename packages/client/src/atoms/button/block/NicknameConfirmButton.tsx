import styled from '@emotion/styled';
import { Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { PROFILEURL } from '../../../configs/Link.url';
import { userDataAtom } from '../../../recoil/user.recoil';
import {
  BaseUserProfileData,
  ControlNickname,
} from '../../../types/Profile.type';

const NicknameConfirmBottonLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: '#1976D2',
  width: '100%',
  height: '50%',
}));

export const checkValidNickname = (nickname: string) => {
  if (
    /\s/.test(nickname) ||
    nickname === '' ||
    nickname == null ||
    nickname.length > 10 ||
    !/^[a-zA-Z0-9]*$/.test(nickname) //
  ) {
    return false;
  }
  return true;
};

function NicknameConfirmButton(props: { controlNickname: ControlNickname }) {
  const { nickname } = props.controlNickname;
  const [user, setUser] = useRecoilState<BaseUserProfileData>(userDataAtom);
  const userData = useRecoilValue(userDataAtom);
  const navigate = useNavigate();

  const editNickname = async () => {
    try {
      await axios
        .patch(
          `${process.env.REACT_APP_SERVER_URL}/users/${userData.id}/nickname`,
          {
            nickname: nickname,
          },
        )
        .then((res) => {
          setUser({ ...user, nickname: nickname });
          navigate(`${PROFILEURL}/${userData.id}`);
        });
    } catch (error: any) {
      alert('중복된 닉네임입니다! 다른 닉네임으로 변경해주세요!');
    }
  };

  const handler = () => {
    if (!checkValidNickname(nickname)) {
      alert('닉네임이 공백을 포함하거나 유효하지 않습니다!');
    } else {
      editNickname();
    }
  };

  return (
    <NicknameConfirmBottonLayout>
      <Button fullWidth variant="contained" onClick={handler}>
        확인
      </Button>
    </NicknameConfirmBottonLayout>
  );
}

export default NicknameConfirmButton;
