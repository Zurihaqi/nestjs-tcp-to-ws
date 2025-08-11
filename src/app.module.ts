import { Module } from '@nestjs/common';
import { TcpModule } from './modules/tcp/tcp.module';
import { WebsocketModule } from './modules/websocket/websocket.module';
import { FileModule } from './modules/file/file.module';

@Module({
  imports: [TcpModule, WebsocketModule, FileModule]
})
export class AppModule {}
