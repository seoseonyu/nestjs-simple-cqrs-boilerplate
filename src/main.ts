import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import express from 'express';

const INSTANCE = +(process.env.NODE_APP_INSTANCE || '0');
const PORT = +(process.env.PORT || '3000');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableCors();

  // Express Request Body Size
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // app.disable('x-powered-by');
  // app.set('trust proxy', true);

  // Graceful ShutDown
  app.enableShutdownHooks();
  await app.listen(PORT + INSTANCE);
}
bootstrap();
