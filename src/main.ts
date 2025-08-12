import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { winstonInstance } from './utils/winstonInstance.util';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.API_PORT ?? 9471;

  const app = await NestFactory.create(AppModule, {
    logger: winstonInstance
  });
  await app.listen(PORT);

  const logger = new Logger('Bootstrap');
  logger.log(`Application listening on port ${PORT}`);
}

bootstrap().catch(console.error);
