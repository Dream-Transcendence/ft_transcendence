import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import styled from '@emotion/styled';
import { createTheme } from '@mui/material';
import { BaseUserProfileData, FriendType } from '../../types/Profile.type';
import { ProfileAvatarLayout } from './AvartarStyles/AvartarStyleCss';

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

function ProfileAvatar(props: {
  avatarType: String | undefined;
  avartarProps: FriendType;
}) {
  const { avatarType, avartarProps } = props;
  const { user } = avartarProps;
  if (avatarType === 'circle') {
    return (
      <ProfileAvatarLayout>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
        >
          <Avatar alt={user.nickname} src={user.image} />
        </StyledBadge>
      </ProfileAvatarLayout>
    );
  } else {
    return (
      <ProfileAvatarLayout>
        <Avatar alt={user.nickname} src={user.image} />
      </ProfileAvatarLayout>
    );
  }
}

export default ProfileAvatar;
