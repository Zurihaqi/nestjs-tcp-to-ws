import { Injectable, Logger } from '@nestjs/common';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { parseTcpData } from 'src/utils/parser.util';
import moment from 'moment';

@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name);

  constructor(private readonly wsGateway: WebsocketGateway) {}

  handleIncomingTcpData(data: Buffer) {
    const parsed = parseTcpData(data); // parsed.raw = 1,2,SG242804138,828-20823-001,02,MY<0x09> | Wed, 06 Aug 2025 14:58:45

    if (!parsed.raw.includes(' | ')) {
      this.logger.debug(`Received invalid data: ${parsed.raw}`);
      return;
    }

    const parsedDataSplit = parsed.raw.split(' | ');
    const barcode = parsedDataSplit[0].trim();

    const rawTimestamp = parsedDataSplit[1].trim();
    let formattedTimestamp = '';

    if (rawTimestamp) {
      formattedTimestamp = moment(rawTimestamp, 'HH:mm:ss').format(
        'YYYY-MM-DD_HH-mm-ss'
      );
    }

    const payload = {
      barcode: barcode,
      filename: formattedTimestamp
    };

    const stringifiedPayload = JSON.stringify(payload); // Frontend sudah handle JSON parsing jadi dibuat string lagi...

    this.wsGateway.broadcastMessage('update-dashboard', stringifiedPayload);
    this.logger.debug(`Emitted ws payload: ${stringifiedPayload}`);
  }
}
