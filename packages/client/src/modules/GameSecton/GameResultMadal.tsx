import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { styled } from '@mui/material';
import UserProfileBox from '../ProfileSection/UserProfileBox';
import { color } from '@mui/system';
import GameScore from './GameScore';

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

function GameResultModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        Open Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        modal
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <GameResultLayout>
            <UserProfileBoxLayout>
              {UserProfileBox(false, 'default')}
            </UserProfileBoxLayout>
            <OtherProfileBoxLayout>
              {UserProfileBox(false, 'circle')}
            </OtherProfileBoxLayout>
            <GameScoreLayout>
              <GameScore player1Score={'10'} player2Score={'9'} />
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
