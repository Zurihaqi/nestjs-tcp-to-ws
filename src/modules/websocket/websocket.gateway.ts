import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

const PORT = process.env.WS_PORT ?? 9472;

@Injectable()
@WebSocketGateway(+PORT, { cors: true })
export class WebsocketGateway implements OnModuleInit {
  private readonly logger = new Logger(WebsocketGateway.name);

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    try {
      this.logger.log(
        `WS server listening on port ${PORT} (env: ${process.env.NODE_ENV || 'development'})`
      );
    } catch (err: any) {
      if (err instanceof Error) {
        this.logger.error(
          `Failed to start WS server: ${err.message}`,
          err.stack
        );
      } else {
        this.logger.error(`Failed to start WS server: ${String(err)}`);
      }
    }
  }

  broadcastMessage(event: string, payload: any) {
    this.server.emit(event, payload);
  }
}
