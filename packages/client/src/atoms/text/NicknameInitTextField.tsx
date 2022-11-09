import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { PROFILEURL } from '../../configs/Link.url';
import { userDataAtom } from '../../recoil/user.recoil';
import { BaseUserProfileData, ControlNickname } from '../../types/Profile.type';
import { checkValidNickname } from '../button/block/NicknameConfirmButton';

const NickNameTextFieldLayout = styled('span')(({ theme }) => ({
  alignSelf: 'center',
  backgroundColor: '#00ff0000',
  width: '100%',
  height: '60%',
}));

function NickNameTextField(props: { controlNickname: ControlNickname }) {
  const { setNickname } = props.controlNickname;
  const { nickname } = props.controlNickname;
  const [user, setUser] = useRecoilState<BaseUserProfileData>(userDataAtom);
  const userData = useRecoilValue(userDataAtom);
  const navigate = useNavigate();

  const HandleNickName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const values = event.target.value;
    setNickname(values);
  };

  const editNickname = async () => {
    try {
      console.log('nick', nickname);
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
    <NickNameTextFieldLayout>
      <TextField
        id="nickName"
        label="닉네임을 입력하세요."
        variant="filled"
        fullWidth
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            handler();
          }
        }}
        onChange={HandleNickName}
      />
    </NickNameTextFieldLayout>
  );
}

export default NickNameTextField;
