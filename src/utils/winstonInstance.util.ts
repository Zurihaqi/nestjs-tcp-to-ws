import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities
} from 'nest-winston';
import * as winston from 'winston';
import * as path from 'path';
import moment from 'moment';

const logDir = path.join(process.cwd(), 'logs');
const logName = `tcp-to-ws_${moment().format('YYYY-MM-DD_HH:mm:ss')}.log`;

const winstonFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  nestWinstonModuleUtilities.format.nestLike('TCP to WS', {
    colors: true,
    prettyPrint: true
  })
);

export const winstonInstance = WinstonModule.createLogger({
  transports: [
    // Log ke console
    new winston.transports.Console({
      level: 'debug',
      format: winstonFormat
    }),
    // Log ke file
    new winston.transports.File({
      filename: path.join(logDir, logName),
      level: 'debug',
      format: winstonFormat
    })
  ]
});
