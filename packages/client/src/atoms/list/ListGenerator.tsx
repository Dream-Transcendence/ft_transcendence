import styled from '@emotion/styled';

import * as React from 'react';
import List from '@mui/material/List';
import BasicSpeedDial from '../SpeedDial/SpeedDial';
import { ListElement } from '../../types/List.type';

const ListUlLayout = styled('ul')(({ theme }) => ({
  height: '100%',
  padding: 1,
}));

function ListGenerator(props: {
  listElement: React.ReactComponentElement<any>;
}) {
  const listElement = props.listElement;

  return (
    <ListUlLayout>
      {/* 리턴값이 배열이라 <> 컴포넌트식으로 구현하지 못하고(이유는 불명) 함수식으로 구현했음  */}
      {listElement}
    </ListUlLayout>
  );
}

export default ListGenerator;
