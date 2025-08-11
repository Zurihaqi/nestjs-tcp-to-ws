import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { WebsocketGateway } from '../websocket/websocket.gateway';

@Module({
  providers: [MessageService, WebsocketGateway],
  exports: [MessageService]
})
export class SharedModule {}
