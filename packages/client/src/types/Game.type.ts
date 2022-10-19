export interface GameRoomDto {
    title: string,
    leftPlayer: {
      id: number,
      nickname: string,
      image: string,
    },
    rightPlayer: {
        id: number,
        nickname: string,
        image: string,
    },
      ballPos: { x: number, y: number },
    paddlePos: { left: number, right: number },
    score: { left: number, right: number },
    mode: number,
  };