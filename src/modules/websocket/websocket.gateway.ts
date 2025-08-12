import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Injectable } from '@nestjs/common';

const PORT = process.env.WS_PORT ?? 9472;

@Injectable()
@WebSocketGateway(+PORT, { cors: true })
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;

  broadcastMessage(event: string, payload: any) {
    this.server.emit(event, payload);
  }
}
