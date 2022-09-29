import { ThemeProvider, Typography } from '@mui/material';
import { styled, createTheme, responsiveFontSizes } from '@mui/material/styles';

interface TitleProps {
  title: string;
}

const RoomTitleLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '60%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

function RoomTitleModule({ title }: TitleProps) {
  let theme = createTheme();
  theme = responsiveFontSizes(theme); //반응형을 위해 사용

  return (
    <RoomTitleLayout>
      <ThemeProvider theme={theme}>
        <Typography variant="h4">{title}</Typography>
        {/* 채팅방 타입에 따라 유연하게 보일 것 */}
        <Typography>🔒</Typography>
      </ThemeProvider>
    </RoomTitleLayout>
  );
}

export default RoomTitleModule;
