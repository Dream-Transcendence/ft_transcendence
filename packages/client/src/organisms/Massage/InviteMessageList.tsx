import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionGroup } from 'react-transition-group';
import {
  InviteInfoListType,
  ServerAcceptGameDto,
} from '../../types/Message.type';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  checkFriendRequestAtom,
  inviteInfoListAtom,
} from '../../recoil/common.recoil';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import {
  ACCEPTFRIENDREQUEST,
  ACCEPTGAME,
  REJECTFRIENDREQUEST,
  REJECTGAME,
  userNameSpace,
} from '../../socket/event';
import useSocket from '../../socket/useSocket';
import { GameInviteInfoType } from '../../types/Game.type';
import { gameInviteInfoAtom } from '../../recoil/game.recoil';
import { useNavigate } from 'react-router-dom';
import { GAMELOADINGURL } from '../../configs/Link.url';

const InviteMessageListLayout = styled('div')(({ theme }) => ({
  bottom: '0',
  right: '0',
  position: 'absolute',
  width: '30%',
  height: '8%',
  overflow: 'hidden',
  backgroundColor: '#1976D2',
}));

const InviteMessageButtonLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));

function InviteMessageList() {
  const [socket] = useSocket(userNameSpace);
  const navigate = useNavigate();
  const [inviteInfoList, setInviteInfoList] =
    useRecoilState<InviteInfoListType[]>(inviteInfoListAtom);
  const [checkFriendRequest, setCheckFriendRequest] = useRecoilState(
    checkFriendRequestAtom,
  );
  const [gameInviteInfo, setGameInviteInfo] =
    useRecoilState<GameInviteInfoType>(gameInviteInfoAtom);
  /**
   * 요청 수락
   */
  const handleAcceptMessage = (info: InviteInfoListType) => {
    console.log(info.type, '수락을 눌렀습니다.');
    setInviteInfoList((prev) => {
      return [...prev.filter((prevMassage) => prevMassage !== info)];
    });
    if (info.type === 'friend') {
      socket.emit(
        ACCEPTFRIENDREQUEST,
        {
          id: info.id,
        },
        (response: boolean) => {
          if (response === true) {
            console.log('ttt?');
            setCheckFriendRequest(true);
          }
        },
      );
    } else if (info.type === 'game') {
      socket.emit(ACCEPTGAME, {
        hostId: info.userId,
        mode: info.mode,
      });
      navigate(GAMELOADINGURL);
    }
  };

  /**
   * 요청 거절
   */
  const handleRejecttMessage = (info: InviteInfoListType) => {
    if (info.type === 'friend') {
      socket.emit(REJECTFRIENDREQUEST, {
        id: info.id,
      });
    } else if (info.type === 'game') {
      socket.emit(REJECTGAME, {
        id: info.userId,
      });
    }
    //거절을 눌렀습니다.
    setInviteInfoList((prev) => {
      return [...prev.filter((prevMassage) => prevMassage !== info)];
    });
  };

  /**
   * 단순 확인 이벤트
   */
  const handleCheckMessage = (info: InviteInfoListType) => {
    setInviteInfoList((prev) => {
      return [...prev.filter((prevMassage) => prevMassage !== info)];
    });
  };

  const element = inviteInfoList.map(
    (info: InviteInfoListType, index: number) => {
      // console.log('why : ', info);
      return (
        <Collapse key={index}>
          <ListItem
            secondaryAction={
              info.type !== 'check' ? (
                <InviteMessageButtonLayout>
                  <IconButton
                    edge="end"
                    aria-label="accept"
                    title="accept"
                    sx={{ padding: 0 }}
                    onClick={() => handleAcceptMessage(info)}
                  >
                    <CheckCircleTwoToneIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="refuse"
                    title="refuse"
                    onClick={() => handleRejecttMessage(info)}
                  >
                    <RemoveCircleTwoToneIcon />
                  </IconButton>
                </InviteMessageButtonLayout>
              ) : (
                <IconButton
                  edge="end"
                  aria-label="accept"
                  title="accept"
                  sx={{ padding: 0 }}
                  onClick={() => handleCheckMessage(info)}
                >
                  <CheckCircleTwoToneIcon />
                </IconButton>
              )
            }
          >
            <ListItemText
              primary={
                <Typography overflow={'hidden'} maxWidth={'100%'}>
                  {info.message}
                </Typography>
              }
              sx={{ backgroundColor: 'white', width: '10px' }}
            />
          </ListItem>
        </Collapse>
      );
    },
  );

  return (
    <div>
      {inviteInfoList.length > 0 ? (
        <InviteMessageListLayout>
          <Box>
            <List>
              <TransitionGroup>{element}</TransitionGroup>
            </List>
          </Box>
        </InviteMessageListLayout>
      ) : null}
    </div>
  );
}

export default InviteMessageList;
