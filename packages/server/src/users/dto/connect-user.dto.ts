export class ConnectionDto {
  constructor(userId: number, onGame: boolean) {
    this.userId = userId;
    this.onGame = onGame;
  }
  userId: number;
  onGame: boolean;
}

export class ConnectionsDto {
  public push(connection: ConnectionDto) {
    this.connections.push(connection);
  }

  connections: ConnectionDto[] = [];
}
