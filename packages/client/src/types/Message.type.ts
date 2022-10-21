export interface ControlMessage {
  messages: SocketMessage[];
  setMessages: (Messages: SocketMessage[]) => void;
}

export interface SocketMessage {
  body: string;
  id: number;
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
