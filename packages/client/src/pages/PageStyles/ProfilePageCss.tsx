import styled from "@emotion/styled";

export const ProfileLayout = styled('div')(({ theme }) => ({
    gridArea: 'ProfileItems',
    display: 'grid',
    placeContent: 'end',
    backgroundColor: '#6BADE2',
    height: '90%',
    width: '100%',
    gridTemplateColumns: '4fr 5fr',
    gridAutoRows: '14%', //gap의 값(5 * 3%)을 생각하여 계산해야됨
    gap: '3%',
    gridTemplateAreas: `'Profile UserStat' 
                          'Profile UserStat' 
                          'Profile MatchHistory' 
                          'FreindList MatchHistory' 
                          'FreindList MatchHistory' 
                          'FreindList Footer'`,
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
    backgroundColor: '#6BADE2',
    height: '100%',
    width: '100%',
}));