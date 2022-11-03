import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import CustomIconButton from '../../atoms/button/icon/CustomIconButtion';
import SendIcon from '@mui/icons-material/Send';
import { CustomIconProps } from '../../types/Link.type';
import useSocket from '../../socket/useSocket';
import { chatNameSpace, SENDMESSAGE } from '../../socket/event';
import { useRecoilValue } from 'recoil';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ControlMessage, SocketMessage } from '../../types/Message.type';
import { userDataAtom } from '../../recoil/user.recoil';

function ChatInputModule(props: { messageSetter: ControlMessage }) {
  const { messages, setMessages } = props.messageSetter;
  const [socket] = useSocket(chatNameSpace);
  const user = useRecoilValue(userDataAtom);
  const { roomId } = useParams();
  const [values, setValues] = useState({
    userId: user.id,
    roomId: roomId,
    body: '',
  });

  useEffect(() => {
    setValues({
      userId: user.id,
      roomId: roomId,
      body: '',
    });
  }, [roomId]);

  const sendMessage = () => {
    // console.log('is data???', values);
    if (values.body !== '') {
      socket.emit(`${SENDMESSAGE}`, values, (res: any) => {
        const sendMessage: SocketMessage = {
          body: values.body,
          id: 0,
          user: {
            id: values.userId,
            image: '',
            nickname: '',
          },
        };
        setMessages([...messages, sendMessage]);
        setValues({ ...values, body: '' });
      });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log('?? twice');
    setValues({ ...values, body: value });
  };

  const handleEnter = (event: any) => {
    console.log('keydow!', event);
    //자꾸 enter를 누르면 refresh되길래 기본기능막아줌
    //chrome은 한글자판을 사용할 경우 229라는 키코드를 두번 보내서 사전에 막아줌
    if (event.key === 'Enter' && event.keyCode !== 229) {
      console.log('~~~~~~~~~~~~');
      event.preventDefault();
      sendMessage();
    }
  };

  const customSendProps: CustomIconProps = {
    icon: <SendIcon />,
    action: sendMessage,
  };
  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '98%',
        backgroundColor: '#00000000',
      }}
    >
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          color: 'white',
          backgroundColor: '#76aef177',
          borderRadius: '10px',
          spellcheck: 'false',
        }}
        spellCheck="false"
        placeholder="  내용을 입력하세요.."
        onChange={handleChange}
        onKeyDown={handleEnter}
        value={values.body}
        inputProps={{ 'aria-label': '내용을 입력하세요..' }}
      />
      {/* [axios POST 요청] 채팅 전송 요청 */}
      {/* [SocketIO 요청] 소켓 연결해아함?? 좀 더 공부해야함 */}
      <CustomIconButton customProps={customSendProps} />
    </Paper>
  );
}

export default ChatInputModule;
