import { styled } from '@mui/material/styles';
import { height } from '@mui/system';

export const ListLayout = styled('li')(() => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '20%',
  paddingTop: '2px',
  paddingBottom: '10px',
  bgcolor: '#00000000',
}));

export const ListChatLayout = styled('li')(() => ({
  width: '70%',
  flex: 'auto',
  bgcolor: '#00000000',
}));

export const ListUlLayout = styled('ul')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  position: 'relative',
  margin: 0,
  padding: '0',
  overflow: 'auto',
}));

export const ListChatUlLayout = styled('ul')(({ theme }) => ({
  position: 'relative',
  padding: 3,
  overflow: 'auto',
  listStyle: 'none',
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
}));

export const ListChatGenerateLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  justifyContent: 'flex-end',
  backgroundColor: '#00FF0000',
}));

export const ListGenerateLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  backgroundColor: '#00FF0000',
}));
