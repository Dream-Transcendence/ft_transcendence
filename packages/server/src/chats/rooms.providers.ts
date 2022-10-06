import { DataSource } from 'typeorm';
import {
  Room,
  DmParticipant,
  ChannelParticipant,
  Message,
} from './rooms.entity';

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
  {
    provide: 'MESSAGES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Message),
    inject: ['DATA_SOURCE'],
  },
];
