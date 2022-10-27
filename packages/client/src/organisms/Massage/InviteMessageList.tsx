import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionGroup } from 'react-transition-group';
import { InviteInfoListType } from '../../types/Message.type';
import { useRecoilState } from 'recoil';
import { inviteInfoListAtom } from '../../recoil/common.recoil';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import { WidthFull } from '@mui/icons-material';
import {
  ACCEPTFRIENDREQUEST,
  ACCEPTGAME,
  FRIENDREQUESTACCEPTED,
  REJECTFRIENDREQUEST,
  REJECTGAME,
  userNameSpace,
} from '../../socket/event';
import useSocket from '../../socket/useSocket';

const InviteMessageListLayout = styled('div')(({ theme }) => ({
  bottom: '500px',
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
  const [inviteInfoList, setInviteInfoList] =
    useRecoilState<InviteInfoListType[]>(inviteInfoListAtom);

  const handleAcceptMessage = (info: InviteInfoListType) => {
    if (info.type === 'friend') {
      socket.emit(ACCEPTFRIENDREQUEST, {
        id: info.id,
      });
    } else if (info.type === 'game') {
      socket.emit(ACCEPTGAME, {
        hostId: info.userId,
        mode: info.mode,
      });
    }
    //수락을 눌렀습니다.
    setInviteInfoList((prev) => {
      return [...prev.filter((i) => i !== info)];
    });
  };

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
    //수락을 눌렀습니다.
    setInviteInfoList((prev) => {
      return [...prev.filter((i) => i !== info)];
    });
  };

  const handleCheckMessage = (info: InviteInfoListType) => {
    setInviteInfoList((prev) => {
      return [...prev.filter((i) => i !== info)];
    });
  };

  const element = inviteInfoList.map((info: InviteInfoListType) => {
    // console.log('why : ', info);
    return (
      <Collapse key={info.message}>
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
  });

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
