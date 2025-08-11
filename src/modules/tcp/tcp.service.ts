import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { createServer, Socket } from 'net';
import { MessageService } from '../shared/message.service';

const PORT = process.env.TCP_PORT ?? 9473;

@Injectable()
export class TcpService implements OnModuleInit {
  private readonly logger = new Logger(TcpService.name);

  constructor(private readonly messageService: MessageService) {}

  onModuleInit() {
    const server = createServer((socket: Socket) => {
      this.logger.log('TCP Client Connected');

      socket.on('data', (data: Buffer) => {
        this.logger.debug(`TCP Received: ${data.toString()}`);
        this.messageService.handleIncomingTcpData(data);
      });

      socket.on('end', () => {
        this.logger.warn('TCP client disconnected');
      });

      socket.on('error', (err) => {
        this.logger.error(`TCP Error: ${err.message}`);
      });
    });

    server.listen(PORT, () => {
      this.logger.log(`TCP server listening on port ${PORT}`);
    });
  }
}
