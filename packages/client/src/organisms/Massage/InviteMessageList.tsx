import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { TransitionGroup } from 'react-transition-group';
import { InviteInfoListType } from '../../types/Message.type';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
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
import { gameTypeAtom, userDataAtom } from '../../recoil/user.recoil';
import { BaseUserProfileData } from '../../types/Profile.type';
import { CUSTOM } from '../../configs/Game.type';

const InviteMessageListLayout = styled('section')(({ theme }) => ({
  bottom: '0',
  right: '0%',
  display: 'float',
  position: 'fixed',
  alignSelf: 'flex-end',
  minWidth: '200px',
  minHeight: '70px',
  maxHeight: '210px',
  padding: '1%',
  width: '30%',
  overflow: 'hidden',
  boxShadow: '0 15px 35px #00000066',
}));

const InviteMessageButtonLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));

function InviteMessageList() {
  const userData = useRecoilValue<BaseUserProfileData>(userDataAtom);
  const [socket] = useSocket(userNameSpace);
  const setGameType = useSetRecoilState<number | null>(gameTypeAtom);
  const [inviteInfoList, setInviteInfoList] =
    useRecoilState<InviteInfoListType[]>(inviteInfoListAtom);
  const setCheckFriendRequest = useSetRecoilState<boolean>(
    checkFriendRequestAtom,
  );
  /**
   * 요청 수락
   */
  const handleAcceptMessage = (info: InviteInfoListType) => {
    setInviteInfoList((prev) => {
      return [...prev.filter((prevMassage) => prevMassage !== info)];
    });
    if (info.type === 'friend') {
      socket.emit(
        ACCEPTFRIENDREQUEST,
        {
          id: info.id,
        },
        (response: any) => {
          if (response) setCheckFriendRequest(true);
        },
      );
    } else if (info.type === 'game') {
      setGameType(CUSTOM);
      socket.emit(ACCEPTGAME, {
        userId: userData.id,
        hostId: info.userId,
        mode: info.mode,
      });
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
                    sx={{ paddingTop: 0 }}
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
            style={{ marginBottom: '8%' }}
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
