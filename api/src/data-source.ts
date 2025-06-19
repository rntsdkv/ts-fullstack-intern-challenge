import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { Like } from './likes/like.entity';
import {
  db_host,
  db_port,
  db_username,
  db_password,
  db_database,
} from './config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: db_host,
  port: db_port,
  username: db_username,
  password: db_password,
  database: db_database,
  synchronize: true,
  logging: true,
  entities: [User, Like],
});
