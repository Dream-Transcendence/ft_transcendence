import { styled } from '@mui/material/styles';
import ListGenerate from '../../atoms/list/ListGenerate';
import { ControlMessage, SocketMessage } from '../../types/Message.type';
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
import axios from 'axios';
import { SERVERURL } from '../../configs/Link.url';
import { useParams } from 'react-router-dom';
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
  marginTop: '70%',
  height: '20px',
  width: '20px',
  position: 'absolute',
  zIndex: 1000,
}));

function ChatLogListOrganisms(props: { messageSetter: ControlMessage }) {
  const { messages, setMessages } = props.messageSetter;
  const [socket] = useSocket(chatNameSpace);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesMiddleRef = useRef<HTMLDivElement | null>(null);
  const [scrollState, setScrollState] = useState(true); // 자동 스크롤 여부
  const [startChatRender, setStartChatRender] = useState(false); // 최초 스크롤이 받아졌는지 여부
  const [isLoaded, setIsLoaded] = useState(true);
  const [isOverflow, setIsOverflow] = useState<boolean>(false);
  const ulRef = useRef<any>(null);
  const { roomId } = useParams();
  const scrollHeight = ulRef.current?.scrollHeight;

  //[수정사항][소켓] 로그인 붙이면 작업할 것 상태변경메시지 브로드캐스트
  useEffect(() => {
    socket.on(`${patchMessage}`, (res) => {
      console.log(res);
      // setMessages([...messages, res]);
    });
  }, [messages]);

  // [수정사항][소켓] 어떤 유저가 메시지 보내면 실시간으로 받아 띄워주기
  useEffect(() => {
    socket.on(`${USERMESSAGE}`, (res) => {
      console.log(res);
      // setMessages([...messages, res]);
    });
  }, [messages]);

  // ul에 리스트가 일정량이상있는지 체크 overflow감지
  useEffect(() => {
    if (ulRef.current) {
      //향후 수정예정 특정 위치에서만 불러지도록 수정할 것
      const isOverflow =
        ulRef.current.scrollHeight > ulRef.current.clientHeight + 50;
      setIsOverflow(isOverflow);
    }
  }, [scrollHeight, setIsOverflow, roomId]);

  // debounce로 0.5초간 입력 측정
  const scrollEvent = _.debounce(() => {
    if (ulRef.current) {
      const scrollTop = ulRef.current.scrollTop; // 스크롤 위치
      const clientHeight = ulRef.current.clientHeight; // 요소의 높이
      const scrollHeight = ulRef.current.scrollHeight; // 스크롤의 높이

      // 스크롤이 맨 아래에서 0.1 이상 떨어져 있는 경우는 밑으로 이동하지 않도록 설정
      setScrollState(
        scrollTop + clientHeight >= scrollHeight * 0.9 ? true : false,
      );
    }
  }, 500);

  //메시지가 업데이트 될 경우, 스크롤을 맨 밑으로 내려주기
  useEffect(() => {
    if (scrollState) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    //지속적으로 스크롤 이벤트 파악
    ulRef.current.addEventListener('scroll', scrollEvent);
  });

  //최초 한번 마운트될 때 불러줌.
  useEffect(() => {
    async function getMessageHistory() {
      await axios.get(`${SERVERURL}/rooms/messages/${roomId}/0`).then((res) => {
        setMessages(res.data);
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
      });
    }
    // 데이터 양이 많아져 스크롤이 생길 경우, db에서 추가로직 불러오는 요청으로 데이터 받아올 것
    if (!isOverflow) {
      getMessageHistory();
    }
  }, [roomId, isOverflow, startChatRender, setMessages]);

  const callApi = async () => {
    // 로딩이 완료 되어 있는 경우에만 호출가능
    if (isLoaded === true) {
      if (startChatRender && messages.length !== 0) {
        // 로딩 중이면 로더 컴포넌트 띄워줄것
        setIsLoaded(false);
        try {
          await axios
            .get(`${SERVERURL}/rooms/messages/${roomId}/${messages[0].id}`)
            .then((res) => {
              setMessages([...res.data, ...messages]);
              setIsLoaded(true);
            });
        } catch (error) {
          console.log(error);
        }
      }
      // 종종 시작하자마자 스크롤이 바로 안 내려가서 한번 더 불러오는 경우가 있다..
      // 임시로 처음들어온 걸 체크한다음 스크롤을 내려줌
      if (!startChatRender) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
        setStartChatRender(true);
      } else {
        //스크롤 중간으로 옮기기
        messagesMiddleRef.current?.scrollIntoView({
          behavior: 'auto',
        });
      }
    }
  };

  // intersection observer로 특정 컴포넌트가 뷰포인트에 드러나는지 감지
  const { firstItemRef } = useInfiniteScroll(callApi);

  // console.log('how many%%%%%%%%%%%%%', messages);
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
