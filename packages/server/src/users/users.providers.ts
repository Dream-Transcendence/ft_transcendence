import { DataSource } from 'typeorm';
import { Auth, Block, Friend, User } from './users.entity';

export const usersProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'BLOCKS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Block),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'AUTH_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Auth),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'FRIENDS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Friend),
    inject: ['DATA_SOURCE'],
  },
];
