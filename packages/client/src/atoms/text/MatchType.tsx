import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const MatchTypeLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  alignContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  backgroundColor: '#00000000',
  flexShrink: 0,
  flexBasis: '20%',
  height: '100%',
  padding: '0.5rem',
  borderRight: 'solid 1px',
}));

function MatchType(matchType: boolean) {
  return (
    <MatchTypeLayout>
      <Typography>
        {matchType ?
          <Typography>ladder</Typography> :
          <Typography>1 vs 1</Typography>}
      </Typography>
    </MatchTypeLayout>
  );
}

export default MatchType;
