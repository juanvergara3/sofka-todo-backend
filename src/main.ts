import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { MongooseExceptionFilter } from './filters/mongoose-exception.filter';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],

  });

  app.setGlobalPrefix('api/');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1'
  });

  app.useGlobalFilters(new MongooseExceptionFilter());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(3000);
}
bootstrap();
