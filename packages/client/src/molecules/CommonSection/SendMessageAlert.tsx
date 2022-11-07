import { Alert, AlertTitle, Button, ButtonGroup } from '@mui/material';
import React, { useState } from 'react';

SendMessageAlert.defaultProps = {
  type: '친구',
};

const button = [<Button key="check">확인</Button>];

//수신뿐만 아니라 송신 팝업도 만들어야 됨
function SendMessageAlert(props: String) {
  const [buttonRole, setButtonRole] = useState(['freind', 'game']);

  // [Socket IO 응답] Socket.on으로 여러 요청 응답
  //친구, 게임 초대 구분 필요
  {
    /* [axios POST 요청] 게임 초대 수락 시, 옵션이 포함된 게임방 개설 및 1 대 1 게임큐 참가 요청  */
  }
  {
    /* [axios POST 요청] 친구 수락 시, 친구목록 추가요청  */
  }
  const to = 'junghan';
  return (
    <Alert
      severity="info"
      action={
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical outlined button group"
        >
          {button}
        </ButtonGroup>
      }
    >
      <AlertTitle>{props} 초대</AlertTitle>
      {to}님을 초대하였습니다.
    </Alert>
  );
}

export default SendMessageAlert;
