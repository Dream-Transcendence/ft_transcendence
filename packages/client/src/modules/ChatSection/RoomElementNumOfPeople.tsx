import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface NumOfPeopleProps {
  num: string;
}

const RoomNumberOfPeopleLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '40%',
  border: 'solid',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

function RoomNumberOfPeopleModule({ num }: NumOfPeopleProps) {
  return (
    <RoomNumberOfPeopleLayout>
      <Typography variant="h5">{num}</Typography>
    </RoomNumberOfPeopleLayout>
  );
}

export default RoomNumberOfPeopleModule;
