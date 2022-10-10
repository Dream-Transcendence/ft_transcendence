import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        // host: 'host.docker.internal',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: true,
        // NOTE console창에 query log를 볼 수 있는 option
      });
      return dataSource.initialize();
    },
  },
];

// export const postgresDataSource = new DataSource({
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: '1234',
//   database: 'Transcendence',
//   entities: [__dirname + '/../**/*.entity.{js,ts}'],
//   synchronize: true,
// });

//  = {
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: '1234',
//   database: 'Transcendence',
//   entities: [__dirname + '/../**/*.entity.{js,ts}'],
//   synchronize: true,
// };
