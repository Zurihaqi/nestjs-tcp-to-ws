import { Injectable, Logger } from '@nestjs/common';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { parseTcpData } from 'src/utils/parser.util';
import moment from 'moment';

@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name);

  constructor(private readonly wsGateway: WebsocketGateway) {}

  handleIncomingTcpData(data: Buffer) {
    const parsed = parseTcpData(data);

    const parsedDataSplit = parsed.raw.split(' | ');
    const barcode = parsedDataSplit[0].trim();

    const rawTimestamp = parsedDataSplit[1].trim();
    let formattedTimestamp = '';

    if (rawTimestamp) {
      formattedTimestamp = moment(rawTimestamp, 'HH:mm:ss').format(
        'YYYY-MM-DD_HH:mm:ss'
      );
    }

    const payload = {
      barcode: barcode,
      timestamp: formattedTimestamp
    };

    this.wsGateway.broadcastMessage('request-update-dashboard', payload);
    this.logger.debug(`Emitted ws payload: ${JSON.stringify(payload)}`);
  }
}
