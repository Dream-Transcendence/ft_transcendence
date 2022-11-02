import styled from '@emotion/styled';

export const ProfileLayout = styled('div')(({ theme }) => ({
  gridArea: 'ProfileItems',
  display: 'grid',
  placeContent: 'end',
  background:
    'linear-gradient(to bottom right, #c0aef1, #76aef1, #70aef1, #c0aef1)',
  height: '90%',
  width: '100%',
  gridTemplateColumns: '4fr 5fr',
  gridAutoRows: '14%', //gap의 값(5 * 3%)을 생각하여 계산해야됨
  gap: '3%',
  gridTemplateAreas: `'ProfilePersonal UserStat' 
                      'ProfilePersonal UserStat' 
                      'ProfilePersonal MatchHistory' 
                      'ProfilePersonal MatchHistory' 
                      'ProfilePersonal MatchHistory' 
                      'ProfilePersonal MatchHistory'`,
}));

export const Footer = styled('div')(({ theme }) => ({
  gridArea: 'Footer',
  width: '50%',
  height: '100%',
  alignSelf: 'center',
  justifySelf: 'end',
}));

export const ProfilePageLayout = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  background:
    'linear-gradient(to bottom right, #c0aef1, #76aef1, #70aef1, #c0aef1)',
  height: '100%',
  width: '100%',
  minWidth: '1200px',
  minHeight: '1000px',
}));
