import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { winstonInstance } from './utils/winstonInstance.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonInstance
  });
  await app.listen(process.env.API_PORT ?? 9471);
}

bootstrap().catch(console.error);
