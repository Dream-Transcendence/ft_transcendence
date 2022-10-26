import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const MatchTypeLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'nowrap',
  alignContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  backgroundColor: '#00000000',
  // flexBasis: '20%', //matchtype width %
  height: '100%',
  width: '20%',
  minWidth: '3rem',
  borderRight: 'solid 1px',
  marginLeft: '0.3rem',
}));

function MatchType(matchType: boolean) {
  return (
    <MatchTypeLayout>
      {matchType ? (
        <Typography>ladder</Typography>
      ) : (
        <Typography>1 vs 1</Typography>
      )}
    </MatchTypeLayout>
  );
}

export default MatchType;
