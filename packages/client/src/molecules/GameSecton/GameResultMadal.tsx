import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { styled } from '@mui/material';
import UserProfileBox from '../ProfileSection/UserProfileBox';
import { color } from '@mui/system';
import GameScore from './GameScore';
import { useEffect } from 'react';
import {
  UserProfileBoxDataType,
  UserProfileBoxType,
} from '../../types/Profile.type';
import { useRecoilValue } from 'recoil';
import { userDataAtom } from '../../recoil/user.recoil';
import { GameResultModalControl } from '../../types/Game.type';
import { useNavigate } from 'react-router-dom';
import { PROFILEURL } from '../../configs/Link.url';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#6D52F6',
  border: '2px solid #6002F6',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const UserProfileBoxLayout = styled('div')(({ theme }) => ({
  gridArea: 'UserProfileBoxLayout',
}));

const OtherProfileBoxLayout = styled('div')(({ theme }) => ({
  gridArea: 'OtherProfileBoxLayout',
}));

const GameScoreLayout = styled('div')(({ theme }) => ({
  gridArea: 'GameScoreLayout',
}));

const ExitButtonLayout = styled('div')(({ theme }) => ({
  gridArea: 'ExitButtonLayout',
  backgroundColor: '#6002F6',
}));

const GameResultLayout = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridAutoRows: '10%', //gap의 값(5 * 3%)을 생각하여 계산해야됨
  gridTemplateAreas: `'UserProfileBoxLayout OtherProfileBoxLayout' 
                      'UserProfileBoxLayout OtherProfileBoxLayout' 
                      'GameScoreLayout GameScoreLayout' 
                      'GameScoreLayout GameScoreLayout' 
                      'GameScoreLayout GameScoreLayout' 
                      'GameScoreLayout GameScoreLayout' 
                      'GameScoreLayout GameScoreLayout' 
                      'GameScoreLayout GameScoreLayout' 
                      'GameScoreLayout GameScoreLayout' 
                      'ExitButtonLayout ExitButtonLayout'`,
  alignItems: 'center',
  justifyItems: 'center',
  alignContents: 'center',
  justifyContents: 'center',
}));

function GameResultModal(openControl: GameResultModalControl) {
  const { open, setOpen, score, gameInfo } = openControl;
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
    navigate(`${PROFILEURL}`);
  };
  const user = useRecoilValue(userDataAtom);
  const defaultUser: UserProfileBoxDataType = {
    id: 0,
    nickname: '',
    image: '',
  };

  //axios get을 통해서 현재 게임에 참여자 2명의 데이터를 받아와야함
  const userProfileBoxProps: UserProfileBoxType = {
    isButton: false,
    avatarType: 'default',
    userData: gameInfo?.leftPlayer || defaultUser,
  };

  const otherProfileBoxProps: UserProfileBoxType = {
    isButton: false,
    avatarType: 'default',
    userData: gameInfo?.rightPlayer || defaultUser,
  };

  // useEffect(() => {
  //   console.log('rest! ', open);
  // }, [open]);
  // console.log('open??? ', open);

  return (
    <div>
      {/* <Button onClick={handleOpen}>
        Open Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        modal
      </Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <GameResultLayout>
            <UserProfileBoxLayout>
              <UserProfileBox userProfileBoxProps={userProfileBoxProps} />
            </UserProfileBoxLayout>
            <OtherProfileBoxLayout>
              <UserProfileBox userProfileBoxProps={otherProfileBoxProps} />
            </OtherProfileBoxLayout>
            <GameScoreLayout>
              <GameScore
                player1Score={String(score?.left)}
                player2Score={String(score?.right)}
              />
              {/* {GameScore({ player1Score: '10', player2Score: '9' })} */}
            </GameScoreLayout>
            <ExitButtonLayout>
              <Button onClick={handleClose} style={{ color: 'white' }}>
                나가기
              </Button>
            </ExitButtonLayout>
          </GameResultLayout>
        </Box>
      </Modal>
    </div>
  );
}
export default GameResultModal;
