import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { PrismaService } from './database/prisma.service';

function swaggerBootstrap(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('The api')
    .setVersion('0.1.0')
    .addTag('health-check')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

async function prismaBootstrap(app: INestApplication) {
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get('API_PORT');

  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());

  await prismaBootstrap(app);
  swaggerBootstrap(app);

  await app.listen(port);
  console.log(`🚀 Server running on ${await app.getUrl()}`);
}
bootstrap();
