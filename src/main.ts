import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

import { AppModule } from './app.module';

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

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());

  const configService = app.get(ConfigService);
  const port = configService.get('API_PORT');

  swaggerBootstrap(app);

  await app.listen(port);
  console.log(`🚀 Server running on ${await app.getUrl()}`);
}
bootstrap();
