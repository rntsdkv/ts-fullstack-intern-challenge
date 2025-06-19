import 'reflect-metadata';
import { AppDataSource } from './data-source';

AppDataSource.initialize()
  .then(() => {
    console.log('Подключение к БД установлено.');
  })
  .catch((error) => console.error('Ошибка подключения:', error));
