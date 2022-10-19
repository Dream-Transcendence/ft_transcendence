import { styled } from '@mui/material/styles';
import ListGenerate from '../../atoms/list/ListGenerate';
import { ControlMessage, ReceivedMessage } from '../../types/Message.type';
import MessageBox from '../../atoms/textPrompt/MessageBox';
import {
  ListChatGenerateLayout,
  ListChatLayout,
  ListChatUlLayout,
  ListGenerateLayout,
  ListLayout,
  ListUlLayout,
} from '../../atoms/list/styles/ListStylesCSS';
import { useEffect, useRef, useState } from 'react';
import useSocket from '../../socket/useSocket';
import {
  chatNameSpace,
  patchMessage,
  patchUserInfo,
  USERMESSAGE,
} from '../../socket/event';
import Loader from '../../atoms/Loading/Loader';
import useInfiniteScroll from '../../hooks/useInfinitiScroll';
import _ from 'lodash';
const ChatLogLayout = styled('div')(({ theme }) => ({
  width: '90%',
  height: '92%',
  display: 'flex',
  flexDirection: 'column',
}));

const CallAPI = styled('div')(({ theme }) => ({
  height: '20%',
  zIndex: 1000,
}));

const AnchorLayout = styled('div')(({ theme }) => ({
  backgroundColor: 'red',
  marginTop: '100%',
  position: 'absolute',
  zIndex: 1000,
}));

function ChatLogListOrganisms(props: { messageSetter: ControlMessage }) {
  const { messages, setMessages } = props.messageSetter;
  const [socket] = useSocket(chatNameSpace);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesMiddleRef = useRef<HTMLDivElement | null>(null);
  const [scrollState, setScrollState] = useState(true); // 자동 스크롤 여부
  const [isLoaded, setIsLoaded] = useState(true);
  const [isOverflow, setIsOverflow] = useState<boolean>(false);
  const ulRef = useRef<any>(null);
  const scrollHeight = ulRef.current?.scrollHeight;
  let num: number = 1;

  //[수정사항] 로그인 붙이면 작업할 것 상태변경메시지 브로드캐스트
  useEffect(() => {
    socket.on(`${patchMessage}`, (res) => {
      console.log(res);
      // setMessages([...messages, res]);
    });
  }, [messages]);

  //어떤 유저가 메시지 보내면 실시간으로 받아 띄워주기
  useEffect(() => {
    socket.on(`${USERMESSAGE}`, (res) => {
      console.log(res);
      // setMessages([...messages, res]);
    });
  }, [messages]);

  // ul에 리스트가 일정량이상있는지 체크 overflow감지
  useEffect(() => {
    const element = ulRef.current;

    if (element) {
      const isOverflow = element.scrollHeight > element.clientHeight;
      setIsOverflow(isOverflow);
    }
  }, [scrollHeight, setIsOverflow, isOverflow]);

  const scrollEvent = _.debounce(() => {
    console.log('scroll');
    const scrollTop = ulRef.current.scrollTop; // 스크롤 위치
    const clientHeight = ulRef.current.clientHeight; // 요소의 높이
    const scrollHeight = ulRef.current.scrollHeight; // 스크롤의 높이

    console.log(scrollTop, clientHeight, scrollHeight);
    // 스크롤이 맨 아래에 있을때
    setScrollState(
      scrollTop + clientHeight >= scrollHeight - 100 ? true : false,
    );
  }, 100);

  //메시지가 업데이트 될 경우, 스크롤을 맨 밑으로 내려주기
  useEffect(() => {
    if (scrollState) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // useEffect(() => {
  //   if (isLoaded === true) {
  //     console.log('dddd');
  //     messagesMiddleRef.current?.scrollIntoView({
  //       behavior: 'smooth',
  //     });
  //   }
  // }, [isLoaded]);

  useEffect(() => {
    ulRef.current.addEventListener('scroll', scrollEvent);
  });

  const callApi = async () => {
    if (isLoaded === true) {
      const newMessage: ReceivedMessage = {
        user: {
          id: 2,
          image: '',
          nickname: 'junghan',
        },
        body: `new message${num++}`,
      };
      setIsLoaded(false);
      await setTimeout(() => {
        console.log('데이터를 받아오는 중..', messages);
        // setMessages([newMessage, ...messages]);
        // 받을 데이터가 있는지에 따라 로딩화면 보여줄 지 결정할 것
        setIsLoaded(true);
      }, 1000);
      messagesMiddleRef.current?.scrollIntoView({
        behavior: 'smooth',
      });
      // console.log('데이터를 받아왔슈.', messages);
      // setMessages([newMessage, ...messages]);
    }
  };
  const { firstItemRef } = useInfiniteScroll(callApi);

  const listElement: React.ReactElement[] = messages.map(
    (msg: any, index: number) => {
      return (
        <ListChatLayout key={index}>
          {index === 0 && isOverflow ? (
            <CallAPI ref={firstItemRef}>
              <MessageBox message={msg} />
            </CallAPI>
          ) : (
            <MessageBox message={msg} />
          )}
        </ListChatLayout>
      );
    },
  );

  return (
    <ChatLogLayout>
      {/* [axios GET 요청]해당 채팅방의 모든 로그 요청 */}
      <ListChatGenerateLayout>
        {!isLoaded && <Loader />}
        <ListChatUlLayout ref={ulRef}>
          <AnchorLayout ref={messagesMiddleRef} />
          {listElement} <div ref={messagesEndRef} />
        </ListChatUlLayout>
      </ListChatGenerateLayout>
    </ChatLogLayout>
  );
}

export default ChatLogListOrganisms;
