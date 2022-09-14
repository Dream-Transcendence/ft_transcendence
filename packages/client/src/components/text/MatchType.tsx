import styled from '@emotion/styled';

const MatchTypeLayout = styled('div')(({ theme }) => ({
  alignContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  backgroundColor: '#00000000',
  flexShrink: 0,
  flexBasis: '20%',
  height: '100%',
}));

function MatchType(matchType: String) {
  return (
    <MatchTypeLayout>
      <text>{matchType}</text>
    </MatchTypeLayout>
  );
}

export default MatchType;
