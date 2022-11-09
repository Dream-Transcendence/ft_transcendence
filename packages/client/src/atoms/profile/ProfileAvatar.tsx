import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import styled from '@emotion/styled';
import { ProfileAvatarLayout } from './AvartarStyles/AvartarStyleCss';
import { UserProfileBoxDataType } from '../../types/Profile.type';
import { useRecoilValue } from 'recoil';
import { ConnectionDto } from '../../types/LogOn.type';
import { userLogStateListAtom } from '../../recoil/user.recoil';
import { useMemo, useRef } from 'react';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    // color: '#44b700',
    boxShadow: `0 0 0 1px`, //${theme.palette.background.paper}
    '&::after': {
      position: 'absolute',
      top: -1,
      left: -1,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    //초록 원 이펙트 크기
    '0%': {
      transform: 'scale(.9)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.0)',
      opacity: 0,
    },
  },
}));

function findState(stateObject: ConnectionDto | undefined) {
  if (stateObject === undefined) {
    return 'logOff';
  } else if (stateObject.onGame === true) {
    return 'onGame';
  } else if (stateObject.userId > 0) {
    return 'logOn';
  }
  return 'logOff';
}

function findUser(id: number | undefined) {
  return (userLogState: ConnectionDto) => {
    return userLogState.userId === id;
  };
}

export function getUserState(
  userLogStateList: ConnectionDto[],
  id: number | undefined,
): string | undefined {
  let state = undefined;
  if (userLogStateList.length > 0) {
    const stateObject = userLogStateList.find(findUser(id));
    state = findState(stateObject);
  }
  return state;
}

function ProfileAvatar(props: {
  avatarType: String | undefined;
  avartarProps: UserProfileBoxDataType;
}) {
  const { avatarType, avartarProps } = props;
  const { id, nickname, image } = avartarProps;
  //logStateList : 로그인중인 유저 list
  const userLogStateList =
    useRecoilValue<ConnectionDto[]>(userLogStateListAtom);
  let userState = useRef<string | undefined>();

  useMemo(() => {
    if (id !== null) userState.current = getUserState(userLogStateList, id);
  }, [userLogStateList, id]);

  if (avatarType === 'circle') {
    return (
      <ProfileAvatarLayout>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
          color={
            userState.current === 'onGame'
              ? 'secondary'
              : userState.current === 'logOn'
              ? 'success'
              : 'error'
          }
        >
          {/** color 및 backgroundcolor 수정 필요 */}
          <Avatar alt={nickname} src={image} />
        </StyledBadge>
      </ProfileAvatarLayout>
    );
  } else {
    return (
      <ProfileAvatarLayout>
        <Avatar alt={nickname} src={image} />
      </ProfileAvatarLayout>
    );
  }
}

export default ProfileAvatar;
