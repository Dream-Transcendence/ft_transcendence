import { Alert, AlertTitle, Box, Button, ButtonGroup } from '@mui/material';
import React, { useState } from 'react';

ReceiveMessageAlert.defaultProps = {
  type: '친구',
};

const button = [<Button key="check">확인</Button>];

const buttons = [
  <Button key="confirm">수락</Button>,
  <Button key="reject">거절</Button>,
];

//수신뿐만 아니라 송신 팝업도 만들어야 됨
function ReceiveMessageAlert(props: String) {
  const [buttonRole, setButtonRole] = useState(['freind', 'game']);

  //친구, 게임 초대 구분 필요
  const to = 'junghan';
  return (
    <Alert
      severity="info"
      action={
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical outlined button group"
        >
          {buttons}
        </ButtonGroup>
      }
    >
      <AlertTitle>{props} 초대</AlertTitle>
      {to}님을 초대하였습니다.
    </Alert>
  );
}

export default ReceiveMessageAlert;
