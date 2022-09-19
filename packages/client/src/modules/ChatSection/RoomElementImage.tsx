import { ThemeProvider, Typography, Avatar } from '@mui/material';
import { styled, createTheme, responsiveFontSizes } from '@mui/material/styles';

interface TitleProps {
  image: string;
}

const RoomElementImageLayout = styled('div')(({ theme }) => ({
  width: '25%',
  height: '40%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

function RoomElementImageModule({ image }: TitleProps) {
  return (
    <RoomElementImageLayout>
      <Avatar alt="Remy Sharp" src={image} />
    </RoomElementImageLayout>
  );
}

export default RoomElementImageModule;
