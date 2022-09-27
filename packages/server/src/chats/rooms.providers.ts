import { DataSource } from 'typeorm';
import { Room, DmParticipant, ChannelParticipant } from './rooms.entity';

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
  {
    provide: 'DMPARTICIPANTS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(DmParticipant),
    inject: ['DATA_SOURCE'],
  },
];
