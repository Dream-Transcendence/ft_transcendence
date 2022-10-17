import { styled } from '@mui/material/styles';

export const ListLayout = styled('li')(() => ({
  width: '100%',
  height: '20%',
  paddingTop: '2px',
  paddingBottom: '10px',
  bgcolor: '#00000000',
}));

export const ListChatLayout = styled('li')(() => ({
  width: '100%',
  height: '10%',
  bgcolor: '#00000000',
}));

export const ListUlLayout = styled('ul')(({ theme }) => ({
  height: '100%',
  position: 'relative',
  padding: 1,
  overflow: 'auto',
}));

export const ListGenerateLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  backgroundColor: '#00FF0000',
}));
