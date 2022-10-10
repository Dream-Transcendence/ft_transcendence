import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const MatchTypeLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  alignContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  backgroundColor: '#00000000',
  flexBasis: '20%', //matchtype width %
  height: '100%',
  margin: '0.5rem',
  borderRight: 'solid 1px',
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
