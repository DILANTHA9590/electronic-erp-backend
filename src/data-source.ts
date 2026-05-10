import 'dotenv/config';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
//   entities: [__dirname + '/../**/*.entity{.ts,.js}'],//prodction
// migrations: [__dirname + '/migrations/*{.ts,.js}'],//production
  entities: ['src/**/*.entity.ts'],//devlopmnet
  migrations: ['src/migrations/*.ts'],//devlopmnet 
  synchronize: true,
});
