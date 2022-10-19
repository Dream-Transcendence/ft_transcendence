export interface ControlMessage {
  messages: ReceivedMessage[];
  setMessages: (Messages: ReceivedMessage[]) => void;
}

export interface ReceivedMessage {
  body: string;
  user: {
    id: number;
    image: string;
    nickname: string;
  };
}

export interface SendMessage {
  userId: number;
  roomId: number;
  body: string;
}
