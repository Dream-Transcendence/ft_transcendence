import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userDataAtom, userSecondAuth } from '../recoil/user.recoil';
import GameCreateTemplate from '../template/GameCreateSection/GameCreateTemplate';
import { UserSecondAuth } from '../types/Profile.type';

const GameCreateLayout = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#6BADE2',
  height: '100%',
  width: '100%',
  minHeight: '800px',
  minWidth: '1200px',
}));

const NavGridLayout = styled('section')(({ theme }) => ({
  width: '100%',
  height: '10%',
}));

const GameCreateTemplateLayout = styled('section')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '90%',
  alignItems: 'center',
  justifyContent: 'center', //justifySelf: 'center'는 왜 안될까..
}));

function GameCreatePage() {
  const userData = useRecoilValue(userDataAtom);
  const navigate = useNavigate();
  const passSecondOauth = useRecoilValue<UserSecondAuth>(userSecondAuth);

  useEffect(() => {
    //정상적인 접근인지 판단하는 로직
    if (userData.id === 0 || passSecondOauth.checkIsValid === false)
      navigate('/');
  }, [userData.id, passSecondOauth, navigate]);

  return (
    <GameCreateLayout>
      <GameCreateTemplateLayout>
        <GameCreateTemplate />
      </GameCreateTemplateLayout>
    </GameCreateLayout>
  );
}

export default GameCreatePage;
