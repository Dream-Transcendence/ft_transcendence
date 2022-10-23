import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import styled from '@emotion/styled';
import { createTheme } from '@mui/material';
import { ProfileAvatarLayout } from './AvartarStyles/AvartarStyleCss';
import {
  BaseUserProfileData,
  FriendType,
  UserProfileBoxDataType,
} from '../../types/Profile.type';
import { useRecoilValue } from 'recoil';
import { userStateListAtom } from '../../recoil/uesr.recoil';
import { UserStateType } from '../../types/LogOn.type';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px`, //${theme.palette.background.paper}
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
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
      transform: 'scale(2.6)',
      opacity: 0,
    },
  },
}));

function findState(stateObject: UserStateType | undefined) {
  if (stateObject === undefined) {
    return 'logOff';
  } else if (stateObject.onGame === true) {
    return 'onGame';
  } else if (stateObject.logOn === true) {
    return 'logOn';
  }
  return 'logOff';
}

function findUser(id: number | undefined) {
  return (logState: UserStateType) => {
    return logState.id === id;
  };
}

function getUserState(
  logStateList: UserStateType[],
  id: number | undefined,
): string | undefined {
  let state = undefined;
  if (logStateList.length > 0) {
    const stateObject = logStateList.find(findUser(id));
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
  const logStateList = useRecoilValue<UserStateType[]>(userStateListAtom);
  const userState = getUserState(logStateList, id);

  if (avatarType === 'circle') {
    return (
      <ProfileAvatarLayout>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
          color={
            userState === 'onGame'
              ? 'warning'
              : userState === 'logOn'
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
