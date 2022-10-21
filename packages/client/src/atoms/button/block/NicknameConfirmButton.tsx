import styled from '@emotion/styled';
import { Button } from '@mui/material';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { PROFILEURL, SERVERURL } from '../../../configs/Link.url';
import { userDataAtom } from '../../../pages/PingpongRoutePage';
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

function NicknameConfirmButton(props: { controlNickname: ControlNickname }) {
  const { nickname } = props.controlNickname;
  const [user, setUser] = useRecoilState<BaseUserProfileData>(userDataAtom);
  const userData = useRecoilValue(userDataAtom);
  const navigate = useNavigate();

  const checkValidNickname = () => {
    if (
      /\s/.test(nickname) ||
      nickname === '' ||
      nickname == null ||
      nickname.length > 10
    ) {
      return false;
    }
    return true;
  };

  const editNickname = async () => {
    await axios
      .patch(`${SERVERURL}/users/${userData.id}/profile`, {
        nickname: nickname,
        image: userData.image,
      })
      .then((res) => {
        if (res.status === 409)
          alert('중복된 닉네임입니다! 다른 닉네임으로 변경해주세요!');
        setUser({ ...user, nickname: nickname });
        navigate(`${PROFILEURL}/${userData.id}`);
      });
  };

  const handler = () => {
    if (!checkValidNickname()) {
      alert('닉네임이 공백을 포함하거나 유효하지 않습니다!');
    } else {
      editNickname();
    }
  };
  return (
    <NicknameConfirmBottonLayout>
      {/* [axios POST 요청] 서버 측으로 닉네임 전달 */}
      <Button fullWidth variant="contained" onClick={handler}>
        확인
      </Button>
    </NicknameConfirmBottonLayout>
  );
}

export default NicknameConfirmButton;
