import { ThemeProvider, Typography } from '@mui/material';
import { styled, responsiveFontSizes, createTheme } from '@mui/material/styles';

interface NumOfPeopleProps {
  num: number;
}

const RoomNumberOfPeopleLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '40%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

function RoomNumberOfPeopleModule({ num }: NumOfPeopleProps) {
  let theme = createTheme();
  theme = responsiveFontSizes(theme); //반응형을 위해 사용

  return (
    <RoomNumberOfPeopleLayout>
      <ThemeProvider theme={theme}>
        <Typography variant="h5">현 인원: </Typography>
        <Typography variant="h5">{num}</Typography>
      </ThemeProvider>
    </RoomNumberOfPeopleLayout>
  );
}

export default RoomNumberOfPeopleModule;
