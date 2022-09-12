import styled from '@emotion/styled';
import * as React from 'react';

const UesrImage = styled('div')(({ theme }) => ({
  backgroundColor: 'green',
  // border: '10px',
  // marginRight: '0px',
  // marginBottom: '0px',
}));

function UserProfileCard() {
  return (
    <div>
      <UesrImage>asa</UesrImage>
    </div>
  );
}

export default UserProfileCard;
