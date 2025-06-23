import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONT_BASE_URL || 'http://localhost',
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
    credentials: true,
  });

  await app.listen(
    parseInt(process.env.API_PORT) || 3000,
    process.env.API_IP || '0.0.0.0',
  );
}

bootstrap();
