export interface ConnectionDto {
  userId: number;
  onGame: boolean;
}

export interface ConnectionsDto {
  connections: ConnectionDto[];
}
