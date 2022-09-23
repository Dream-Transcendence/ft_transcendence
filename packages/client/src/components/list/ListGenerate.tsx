import styled from '@emotion/styled';
import UserProfileBox from '../../modules/ProfileSection/UserProfileBox';

import * as React from 'react';
import List from '@mui/material/List';
import BasicSpeedDial from '../SpeedDial/SpeedDial';
import { Margin } from '@mui/icons-material';

const ListGenerateLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '75%',
  width: '85%',
  backgroundColor: '#00FF0000',
  border: 'solid 1px',
}));

//이런식으로 엘리멘트를 함수로 전달가능하네 아이콘도 함수하나로 처리가능할듯
function generate(element: React.ReactElement) {
  //배열로 받으면 목록 띄워 줄 수 있을 듯
  return [0, 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

function ListGenerate(element: React.ReactElement) {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return (
    <ListGenerateLayout>
      <List
        dense={dense}
        sx={{
          width: '100%',
          height: '100%',
          bgcolor: '#00000000',
          position: 'relative',
          overflow: 'auto',
          paddingTop: '0px',
          paddingBottom: '0px',
          '& ul': { padding: 1 },
        }}
      >
        {generate(element)}
      </List>
    </ListGenerateLayout>
  );
}

export default ListGenerate;
