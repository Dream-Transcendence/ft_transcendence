import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        // NOTE: synchronize는 개발용으로만 사용하고, 배포시에는 false 로 설정해야 함
        synchronize: false,
        logging: false,
        // NOTE console창에 query log를 볼 수 있는 option
      });
      return dataSource.initialize();
    },
  },
];
