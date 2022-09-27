import { DataSource } from 'typeorm';
import { Room } from './rooms.entity';
import { ChannelParticipant } from './rooms.entity';

export const roomsProviders = [
  {
    provide: 'ROOMS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Room),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'CHANNELPARTICIPANTS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ChannelParticipant),
    inject: ['DATA_SOURCE'],
  },
];
